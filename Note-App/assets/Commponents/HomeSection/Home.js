import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button  } from 'react-native';
import Category from './Category';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TouchableOpacity} from 'react-native-gesture-handler'
import { Dimensions } from 'react-native';
import { useLinkProps } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home(props) {

    function Add_Categorey() {
        console.log("Add Category")
    }


  return (
    //     <View>
    //         <ScrollView showsVerticalScrollIndicator ={false}>
    //         <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
    //             <Category navigation={props.navigation} />
 
    //         </View>
    //         </ScrollView> 
    //             <View style={styles.base}>
    //                     <View  style={styles.baseTop} >
    //                         <TouchableHighlight>
    //                             <Icon onPress={Add_Categorey} name="plus" size={70} style={{color:'whitesmoke', margin: 21}} />
    //                         </TouchableHighlight >
    //                     </View>
    //                     <View style={styles.baseBottom} />
    //             </View>
    //    </View>
     <View>
            <ScrollView showsVerticalScrollIndicator ={false}>
            <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
                <Category navigation={props.navigation} />

            </View>
            </ScrollView> 
                {/* <View style={styles.Base}>
                        <View>
                            <TouchableHighlight>
                                <Icon onPress={Add_Categorey} name="plus" size={70} style={{color:'whitesmoke', margin: 21}} />
                            </TouchableHighlight >
                        </View>
                        <View />
                </View> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//     base: {width:windowWidth, zIndex: 3,  bottom: 0, position: 'absolute'},
//     baseTop: {
//         width: 100,
//         height: 100,
//         borderRadius: 100 / 2,
//         backgroundColor: "#f97171",
//         top: -110,
//         left: 130,
//         position: "absolute",
//         borderRightColor: "transparent",
//         borderLeftColor: "transparent",
//         zIndex: 2,
//         position: 'absolute', 
//         bottom: 10
//       },
//     baseBottom: {
//       backgroundColor: "#2c5c8c",
//       height: 55,
//       width: windowWidth,
//       borderTopWidth: 10,
//       borderTopColor: '#f97171',
//       zIndex: 0,
//       position: 'absolute', 
//       bottom: 0,
//     },
// });

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


