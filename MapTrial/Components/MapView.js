import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar, TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

import { locations as studylocations } from './StudyData'
import { locations as dininglocations } from './DiningData'
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './CustomMarkers'

export default class App extends Component {
  getCurrentLocation(){
    Geolocation.getCurrentPosition(info => //console.log(info)
      this.setState({place:{latitude:34.069905, longitude:-118.445275}})//info.coords.latitude, longitude:info.coords.longitude}}) //set this to default UCLA values for testing
      )//change this back
  }

  constructor (props)
  {
    super(props)
    console.log(props)
    this.state = {place:{}, locations:props.mode=="Study" ? studylocations:dininglocations}
  }
  
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => this.setState({place:{latitude:place.coords.latitude, longitude:place.coords.longitude}})//console.log(place)
    //this.setState({place:{latitude:place.coords.latitude, longitude:place.coords.longitude}})
    )
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  componentDidMount() { //Before rendering, ensures data is available
    this.getCurrentLocation();
  }

  preferenceOptimize() { //Find out which is the most optimal study location
    var distanceWeight = 20; //Alter these weights based on what preference you have over the other
    var busyWeight = 40; //Think about: what if people preferred a less busy one, dont care about distance?
    var deltaLat = Math.abs(this.state.place.latitude - this.state.locations[0].latitude);
    var deltaLong = Math.abs(this.state.place.longitude - this.state.locations[0].longitude);
    var latSide = Math.pow(deltaLat, 2);
    var longSide = Math.pow(deltaLong, 2);
    var distance = Math.sqrt(latSide + longSide);

    var least = Number(this.state.locations[0].capacityQuant)*busyWeight + distance*distanceWeight;
    var leastIndex = 0;
    for (let i = 1; i < 7; i++)
    {
      deltaLat = Math.abs(this.state.place.latitude - this.state.locations[i].latitude);
      deltaLong = Math.abs(this.state.place.longitude - this.state.locations[i].longitude);
      latSide = Math.pow(deltaLat, 2);
      longSide = Math.pow(deltaLong, 2);
      distance = Math.sqrt(latSide + longSide);

      if (Number(this.state.locations[i].capacityQuant)*busyWeight + distance*distanceWeight <= least)
      {
        least = Number(this.state.locations[i].capacityQuant)*busyWeight + distance*distanceWeight;
        leastIndex = i;
      }
    }
    return leastIndex;
  }

  render(){
    if (this.state.place.latitude != undefined) { //FIRST ENSURE THAT LATITUDE IS NOT UNDEFINED, set state happens asynchronously
    return( //here, before the return, put like your calculation of all the distances and stuff
      // CURRENT WORKING ONE WITH CURRENT LOCATION POSSIBLE

        <View style = {styles.container}>
        <Text style = {styles.optimalLocation}>CLOSEST/LEAST BUSY: {this.state.locations[this.preferenceOptimize()].title}</Text>
        

        {this.state.place.latitude != undefined && 
        <MapView
        provider = {PROVIDER_GOOGLE}
        style = {styles.map}
        initialRegion = {{ //Current Location: UCLA
          latitude: this.state.place.latitude,//40.649238,
          longitude: this.state.place.longitude,//-73.986581,
          latitudeDelta: 0.03, //controls how zoomed in the view is when loaded
          longitudeDelta: 0.02
        }}
        >
        {
          this.state.locations.map(marker => (
            <Marker
            key = {marker.title}
            
            coordinate = {{latitude: marker.latitude,
              longitude: marker.longitude}}
              title = {marker.title}
              identifier = {marker.identifier}
            >
            <CustomMarker item = {marker}/>
            {/* <View style = {styles.roundMarker}>
            <Image style = {styles.roundImage} source = {{uri: marker.markerImage}}/>
            
            </View> */}
            <Text style = {styles.locationName}>{marker.title}</Text>
            </Marker>
          ))
        }
        </MapView>
      }
      
      </View>

    ) }
    else {
      return (null);
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map:{
    flex: 1
  },
  optimalLocation:{
    backgroundColor: 'gold',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
  locationName:{
    textAlign: 'center',
    fontSize: 12,
  }

})