import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import AddCategory from './AddCategory';
import Icon from 'react-native-vector-icons/FontAwesome';




const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#000',
        style: {
            backgroundColor: '#2c5c8c',
          }
    }}
    >
      <Tab.Screen name="Home" component={Home} 
      options={{
          title: 'Home',
          tabBarIcon: ()=> <Icon name="home" size={30} style={{color:'whitesmoke'}} />
      }} />
      <Tab.Screen name="Add Category" component={AddCategory}
            options={{
                tabBarIcon: ()=> <Icon name="plus" size={100} style={{color:'red', marginBottom: 30}} />,
                title: ''
            }}
      />
    </Tab.Navigator>
  );
}

export default MainTab