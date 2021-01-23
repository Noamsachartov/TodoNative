import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './assets/Commponents/HomeSection/Home';
import NoteInCategory from './assets/Commponents/NoteSection/NoteInCategory';
import MainTab from './assets/Commponents/HomeSection/MainTab';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"         
        options={{
          title: 'My Note',
          headerStyle: {
            backgroundColor: '#2c5c8c',
            borderBottomColor: '#f97171',
            borderBottomWidth: 10
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={MainTab} />
        <Stack.Screen name="NoteInCategory" 
        options={{
          title: 'Note',
          headerStyle: {
            backgroundColor: '#2c5c8c',
            borderBottomColor: '#f97171',
            borderBottomWidth: 10
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={NoteInCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

