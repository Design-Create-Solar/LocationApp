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
import axios from 'axios'


async function getCapacity(name, address){
  let result = await axios ({ //for LIVE DATA
      method: 'post',
      url:'https://besttime.app/api/v1/forecasts/live?',
      params: {
        api_key_private:'pri_a02d3d2435574495bf1003d6ba88491f',
        venue_name: name,
        venue_address: address,
      }
  }).then(res => {
      console.log(res)
      if (res.data.status != 'Error') {
        console.log(res.data.analysis.venue_live_busyness); //can be deleted after
        return(Number(res.data.analysis.venue_live_busyness));
      }
  });

  var dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];//further abbreviated to alleviate misconceptions of Json spellings
  //console.log(dayNames.indexOf('Mo'));
  result = await axios ({ //for FORECASTS
    method: 'post',
    url:'https://besttime.app/api/v1/forecasts?', 
    params: {
      api_key_private:'pri_a02d3d2435574495bf1003d6ba88491f',
      venue_name: name,
      venue_address: address,
    }
  }).then(res => {
    console.log(res)
    if (res.data.status != 'error' && res.data.status != 'Error') {
      var dateTime = res.headers.date;
      var day;
      var dayNum;
      var hour;
      var dayReverse = 0;
      var iterator = 0;
      while (dateTime.substring(iterator, iterator + 1) != ':') {
        iterator++;
      }
      hour = Number(dateTime.substring(iterator-2, iterator));
      
      hour = hour - 7;
      if (hour < 0) {
        hour = 24 + hour; //accounting for timezone
        dayReverse = 1;
      }

      var trueHour; //According to the hour_analysis json
      trueHour = hour - 6;
      if (trueHour < 0) {
        trueHour = 24 + trueHour;
      }

      //console.log(hour)
      day = dateTime.substring(0, 2)
      if (dayReverse = 1) {
        dayNum = dayNames.indexOf(day) - 1;
        if (dayNum == -1) {
          dayNum = 6;
        }
      }
      else {
        dayNum = dayNames.indexOf(day)
      }
      //console.log(dayNum)
      //console.log(res.data.analysis[dayNum].hour_analysis[trueHour].intensity_txt)
      return(String(res.data.analysis[dayNum].hour_analysis[trueHour]));
    }
    else {
      return(Number(-1));
    }
  });

  
}


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
    this.state = {place:{}, locations:props.mode=="Study" ? studylocations:dininglocations , capacity: [42, 60, 90, 75, 32, 46, 40]}
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
    var distanceWeight = 100; //Alter these weights based on what preference you have over the other
    var busyWeight = 2; //Think about: what if people preferred a less busy one, dont care about distance?
    var deltaLat = Math.abs(this.state.place.latitude - this.state.locations[0].latitude);
    var deltaLong = Math.abs(this.state.place.longitude - this.state.locations[0].longitude);
    var latSide = Math.pow(deltaLat, 2);
    var longSide = Math.pow(deltaLong, 2);
    var distance = Math.sqrt(latSide + longSide);

    var least = this.state.capacity[0]*busyWeight + distance*distanceWeight;
    var leastIndex = 0;
    for (let i = 1; i < 7; i++)
    {
      deltaLat = Math.abs(this.state.place.latitude - this.state.locations[i].latitude);
      deltaLong = Math.abs(this.state.place.longitude - this.state.locations[i].longitude);
      latSide = Math.pow(deltaLat, 2);
      longSide = Math.pow(deltaLong, 2);
      distance = Math.sqrt(latSide + longSide);

      if (this.state.capacity[i]*busyWeight + distance*distanceWeight <= least)
      {
        least = this.state.capacity[i]*busyWeight + distance*distanceWeight;
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
          {/* { this.state.capacity[marker.identifier] > 70 &&
            <Text style = {styles.capacityTextFull}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          }

          { this.state.capacity[marker.identifier] <= 70 && this.state.capacity[marker.identifier] > 40 &&
            <Text style = {styles.capacityTextMedium}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          }

          { this.state.capacity[marker.identifier] <= 40 &&
            <Text style = {styles.capacityTextEmpty}>{this.state.capacity[Number(marker.identifier)].toString()}</Text> 
          } */}
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