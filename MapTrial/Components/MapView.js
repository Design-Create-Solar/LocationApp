import React, {Component, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  Image,
  Switch,
  Animated,
  Linking,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const studylocations = require('./StudyData');
const dininglocations = require('./DiningData');
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './CustomMarkers';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export default class App extends Component {
  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (
        info, //console.log(info)
      ) =>
        this.setState({place: {latitude: 34.069905, longitude: -118.445275}}), //info.coords.latitude, longitude:info.coords.longitude}}) //set this to default UCLA values for testing
      (error) => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    ); //change this back
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      place: {},
      locations: props.mode == 'Study' ? studylocations : dininglocations,
      optimal: 0,
      viewState: 'hill',
      dineState: 'ack',
      currView: props.mode,
      preferenceStore: 0,
    };
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(
        (place) =>
          this.setState({
            place: {
              latitude: place.coords.latitude,
              longitude: place.coords.longitude,
            },
          }), //console.log(place)
        //this.setState({place:{latitude:place.coords.latitude, longitude:place.coords.longitude}})
      )
      .catch((error) => console.log(error.message)); // error is a Javascript Error object
  }

  componentDidMount() {
    //Before rendering, ensures data is available
    SplashScreen.hide();
    this.getCurrentLocation();
    //this.setState({optimal: this.preferenceOptimize()})
  }

  preferenceOptimize() {
    //Find out which is the most optimal study location
    let origCount = this.state.preferenceStore;
    let count = 0;
    if (this.state.preferenceStore != this.state.locations.length) {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].capacity != -2) {
          console.log(this.state.locations[i].capacity);
          console.log(this.state.locations.length);
          count++;
        }
      }
      if (origCount != count) {
        this.setState({preferenceStore: count});
      }
    }
    var distanceWeight = 20; //Alter these weights based on what preference you have over the other
    var busyWeight = 40; //Think about: what if people preferred a less busy one, dont care about distance?
    var deltaLat = Math.abs(
      this.state.place.latitude - this.state.locations[0].latitude,
    );
    var deltaLong = Math.abs(
      this.state.place.longitude - this.state.locations[0].longitude,
    );
    var latSide = Math.pow(deltaLat, 2);
    var longSide = Math.pow(deltaLong, 2);
    var distance = Math.sqrt(latSide + longSide);
    let i = 1;
    let j = 0;
    while (this.state.locations[j].capacityQuant == 10000000 && j < 7) {
      j++;
      i++;
    }

    var least =
      Number(this.state.locations[j].capacityQuant) * busyWeight +
      distance * distanceWeight;
    console.log('Least: ' + this.state.locations[j].title);
    var leastIndex = j;
    for (; i < this.state.locations.length; i++) {
      //console.log("Current: " + this.state.locations[i].title, "Dist: " + distance, "Capacity: " + this.state.locations[i].capacityQuant);
      deltaLat = Math.abs(
        this.state.place.latitude - this.state.locations[i].latitude,
      );
      deltaLong = Math.abs(
        this.state.place.longitude - this.state.locations[i].longitude,
      );
      latSide = Math.pow(deltaLat, 2);
      longSide = Math.pow(deltaLong, 2);
      distance = Math.sqrt(latSide + longSide);

      if (
        Number(this.state.locations[i].capacityQuant) * busyWeight +
          distance * distanceWeight <=
        least
      ) {
        if (
          this.state.locations[i].capacity == 'Closed' ||
          this.state.locations[i].capacity == 'Unav.'
        ) {
          continue;
        }
        least =
          Number(this.state.locations[i].capacityQuant) * busyWeight +
          distance * distanceWeight;
        leastIndex = i;
      }
    }
    return this.state.locations[leastIndex].title;
  }

  animateCampHill() {
    let r;
    if (this.state.viewState == 'campus') {
      r = {
        //on the hill
        latitude: 34.072885,
        longitude: -118.451047,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      this.setState({viewState: 'hill'});
    } else if (this.state.viewState == 'hill') {
      r = {
        //on campus
        latitude: 34.072411,
        longitude: -118.441096,
        latitudeDelta: 0.007,
        longitudeDelta: 0.01,
      };
      this.setState({viewState: 'campus'});
    }
    this.mapView.animateToRegion(r, 500); //second parameter defines speed
  }

  animateAckBomb() {
    let r;
    if (this.state.dineState == 'bo') {
      r = {
        latitude: 34.0705,
        longitude: -118.44422,
        latitudeDelta: 0.0004,
        longitudeDelta: 0.0003,
      };
      this.setState({dineState: 'ack'});
    } else if (this.state.dineState == 'ack') {
      r = {
        latitude: 34.0683,
        longitude: -118.44225,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.0004,
      };
      this.setState({dineState: 'bo'});
    }
    this.mapView.animateToRegion(r, 500); //second parameter defines speed
  }

  render() {
    // const [isEnabled, setIsEnabled] = React.useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    if (this.state.place.latitude != undefined) {
      //FIRST ENSURE THAT LATITUDE IS NOT UNDEFINED, set state happens asynchronously

      return (
        //here, before the return, put like your calculation of all the distances and stuff
        // CURRENT WORKING ONE WITH CURRENT LOCATION POSSIBLE
        <View style={styles.container}>
          <Text style={styles.optimalLocation}>
            Press Images for Room Reservations/Menus
          </Text>

          {this.state.place.latitude != undefined && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              ref={(ref) => (this.mapView = ref)}
              initialRegion={{
                //Current Location: UCLA
                latitude: this.state.place.latitude, //40.649238,
                longitude: this.state.place.longitude, //-73.986581,
                latitudeDelta: 0.03, //controls how zoomed in the view is when loaded
                longitudeDelta: 0.02,
              }}>
              {this.state.locations.map((marker) => (
                <Marker
                  onPress={() => {
                    if (marker.website != '') {
                      Linking.openURL(marker.website);
                    }
                  }}
                  key={marker.title}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  identifier={marker.identifier}>
                  <CustomMarker item={marker} />
                  <Text style={styles.locationName}>{marker.title}</Text>
                </Marker>
              ))}
            </MapView>
          )}

          <Text style={styles.optimalLocation}>
            CLOSEST/LEAST BUSY: {this.preferenceOptimize()}
          </Text>
          {this.state.currView == 'Dining' && (
            <Button
              type="outline"
              title="ZOOM - ACKERMAN | BOMBSHELTER"
              onPress={() => this.animateAckBomb()}
            />
          )}
          <Button
            title="ON CAMPUS | ON THE HILL"
            onPress={() => this.animateCampHill()}
          />
          <Text style={styles.bottomSpace}></Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black',
    fontWeight: 'bold',
  },
  switchComp: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    backgroundColor: 'transparent',
    opacity: 1,
  },
  bottomSpace: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  map: {
    flex: 1,
  },
  optimalLocation: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  locationName: {
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: 'rgb(250,250,210)',
  },
});
