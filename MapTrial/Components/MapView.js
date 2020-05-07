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
      this.setState({place:{latitude:info.coords.latitude, longitude:info.coords.longitude}})
      )
  }

  constructor (props)
  {
    super(props)
    this.state = {place:{}, locations:locations, capacity: ["42%"]}
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
    return(
      // CURRENT WORKING ONE WITH CURRENT LOCATION POSSIBLE
        <View style = {styles.container}>
          <TouchableOpacity
            //style={styles.button}
            onPress={() => this.getCurrentLocation()} //Potential for reset button if user has moved
          >
            <Text style = {{marginTop: 40, padding: 30}}>Pick a Place</Text>
          </TouchableOpacity>

        {this.state.place.latitude != undefined && 
        <MapView
        provider = {PROVIDER_GOOGLE}
        style = {styles.map}
        initialRegion = {{ //Current Location: UCLA
          latitude: 34.069905,//this.state.place.latitude,//40.649238,
          longitude: -118.445275,//this.state.place.longitude,//-73.986581,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        >
        {
          this.state.locations.map(marker => (
            <Marker
            key = {marker.title}
            coordinate = {{latitude: marker.latitude,
              longitude: marker.longitude}}
              title = {marker.title}
            >
              <CustomMarker item = {marker}/>
             <Text style = {styles.capacityText}>{this.state.capacity[0]}</Text>
             
             </Marker>
          ))
        }
        </MapView>
      }
      </View>

      //IN PROGRESS
      // <View style = {styles.container}>
      //   <TouchableOpacity
      //     //style={styles.button}
      //     onPress={() => this.getCurrentLocation()} //Potential for reset button if user has moved
      //   >
      //     <Text style = {{marginTop: 40, padding: 30}}>Pick a Place</Text>
      //   </TouchableOpacity>
        

      //   {/* {this.state.place.latitude !== undefined &&  */}
      //   <MapView
      //   provider = {PROVIDER_GOOGLE}
      //   style = {styles.map}
        

      //   initialRegion={{latitude: this.state.place.latitude, longitude: this.state.place.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
      //   //console.log(this.state.place.longitude);
      //   //initialRegion=
      //   // {{
      //   //   latitude: 40.649238,
      //   //   longitude: -73.986581,
      //   //   latitudeDelta: 0.0922,
      //   //   longitudeDelta: 0.0421
      //   // }} //something wrong with the state place, if having trouble set to default location instead
        
      //   >
      //   {
      //     this.state.locations.map(marker => (
      //       <Marker
      //       key = {marker.title}
      //       coordinate = {{latitude: marker.latitude,
      //         longitude: marker.longitude}}
      //       >
      //       {/* <CustomMarker item = {marker}/>
      //       <Text>{this.state.titleText}</Text> */}
      //       </Marker>
      //     ))
      //   } 
      //   </MapView>}

        
      //   {/* {this.state.place.latitude === undefined &&<MapView
      //   provider = {PROVIDER_GOOGLE}
      //   style = {styles.map}

      //   //initialRegion={this.state.place.latitude != undefined ? //{latitude: this.state.place.latitude, longitude: this.state.place.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}
      //   //{latitude: 37.785834, longitude: -122.406417, latitudeDelta: 0.0922, longitudeDelta: 0.0421}
      //   initialRegion= {{
      //     latitude: 40.649238,
      //     longitude: -73.986581,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421
      //   }} //something wrong with the state place, if having trouble set to default location instead
      //   >
      //   { {
      //     this.state.locations.map(marker => (
      //       <Marker
      //       key = {marker.title}
      //       coordinate = {{latitude: marker.latitude,
      //         longitude: marker.longitude}}
      //       >
      //       <CustomMarker item = {marker}/>
      //       <Text>{this.state.titleText}</Text>
      //       </Marker>
      //     ))
      //   }  }
      //   </MapView>} */}
      // </View>
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
  capacityText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    
  }
})