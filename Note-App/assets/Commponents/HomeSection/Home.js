import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button  } from 'react-native';
import Category from './Category';
import { Dimensions } from 'react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home(props) {

  return (
     <View style={{backgroundColor: 'white', height: windowHeight}}>
            <ScrollView showsVerticalScrollIndicator ={false}>
            <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
                <Category navigation={props.navigation}  />
            </View>
            </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
Base: {
    backgroundColor: 'red',
    height: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width:windowWidth
}
})


