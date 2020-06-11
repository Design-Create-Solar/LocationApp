import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar, TouchableOpacity
} from 'react-native';
import MapView from './Components/MapView'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SplashScreen from 'react-native-splash-screen'

function StudyScreen() {
  return (
    <MapView mode="Study"></MapView>
  );
}

function DiningScreen() {
  return (
    <MapView mode="Dining"></MapView>
  );
}

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
//const Tab = createMaterialBottomTabNavigator();
class App extends React.Component {
  render()
  {
    return (
      
      <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 16, height: 20 },
        tabStyle: { width: 188, height: 100 },
        activeTintColor: '#cfa900',
        tabBarPosition: 'bottom',
        swipeVelocityImpact: 0.1,
        style: { backgroundColor: 'white', height: 80 },
      }}
      >
        <Tab.Screen name="Study" component={StudyScreen}/>
        <Tab.Screen name="Dining" component={DiningScreen} />
      </Tab.Navigator>
      
    </NavigationContainer>
    );//<MapView></MapView>
  }
}

export default App;