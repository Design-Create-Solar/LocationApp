/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
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

import { locations } from './Data'
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './CustomMarkers'

export default class App extends Component {
  getCurrentLocation(){
    Geolocation.getCurrentPosition(info => //console.log(info)
      this.setState({place:{latitude:info.coords.latitude, longitude:info.coords.longitude}}) //set this to default UCLA values for testing
      )
  }

  constructor (props)
  {
    super(props)
    this.state = {place:{}, locations:locations, colors: ['red', '#FFD700', '#1E90FF'], capacity: [42, 10, 90, 75, 32, 46, 2]}
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

  render(){
    if (this.state.place.latitude != undefined) { //FIRST ENSURE THAT LATITUDE IS NOT UNDEFINED, set state happens asynchronously
    return( //here, before the return, put like your calculation of all the distances and stuff
      // CURRENT WORKING ONE WITH CURRENT LOCATION POSSIBLE
        <View style = {styles.container}>
          {/* <TouchableOpacity
            //style={styles.button}
            onPress={() => this.getCurrentLocation()} //Potential for reset button if user has moved
          >
            <Text style = {{marginTop: 40, padding: 30}}>Pick a Place</Text>
          </TouchableOpacity> */}

        {this.state.place.latitude != undefined && 
        <MapView
        provider = {PROVIDER_GOOGLE}
        style = {styles.map}
        initialRegion = {{ //Current Location: UCLA
          latitude: 34.069905,//this.state.place.latitude,//40.649238,
          longitude: -118.445275,//this.state.place.longitude,//-73.986581,
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
          { this.state.capacity[marker.identifier] > 70 &&
            <Text style = {styles.capacityTextFull}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          }

          { this.state.capacity[marker.identifier] <= 70 && this.state.capacity[marker.identifier] > 40 &&
            <Text style = {styles.capacityTextMedium}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          }

          { this.state.capacity[marker.identifier] <= 40 &&
            <Text style = {styles.capacityTextEmpty}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          }
            <Text style = {styles.locationName}>{marker.title}</Text>
            </Marker>
          ))
        }
        </MapView>
      }
      {/* <Text style = {{marginTop: 40, padding: 30}}>bruh</Text> make test value overlap the map*/} 
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
  capacityTextFull:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red'
  },
  capacityTextMedium:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#e6ac00'
  },
  capacityTextEmpty:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1E90FF'
  },
  locationName:{
    textAlign: 'center',
    fontSize: 12,
  }

})