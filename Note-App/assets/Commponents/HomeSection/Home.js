import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button  } from 'react-native';
import Category from './Category';
import { Dimensions } from 'react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home(props) {

  return (
     <View style={styles.mainView}>
            <ScrollView showsVerticalScrollIndicator ={false}>
            <View style={styles.view}>
                <Category navigation={props.navigation}  />
            </View>
            </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
mainView: {backgroundColor: 'white', height: windowHeight},
view: {flex: 1, flexDirection: 'column', marginBottom: 250}
})


