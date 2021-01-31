import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet} from 'react-native';
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
            height: 70
          }
    }}
    >
      <Tab.Screen name="Home" component={Home} 
      options={{
          title: 'Home',
          tabBarIcon: ()=> <Icon name="home" size={40} style={styles.home} />
      }} />
      <Tab.Screen name="Add Category" component={AddCategory}
            options={{
                tabBarIcon: ()=> <Icon name="plus" size={50} style={styles.AddCategory} />,
                title: 'New'
            }}
      />
    </Tab.Navigator>
  );
}

export default MainTab

const styles = StyleSheet.create({
  home: {color:'whitesmoke'},
  AddCategory: {color:'red'},
  })
  