import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Button } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Category extends Component{
    state = {
        Get_Category: ''
    }
    Category_List =() =>{
        console.log("pressed")
    }
    Preference =() => {
        console.log("edit")
    }

GetData = () => {
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('CategoryList');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
          console.log("error get")
        }
      };
}

    componentDidMount() {
       
    }
  
    render(){
        const { navigation } = this.props;

        var Category_List = '';
        if (this.state.Get_Category){
            var Category_List = this.state.Get_Category.map((item,index) => {
                return (<TouchableOpacity name={item.Title} CategoryId={item.Id} key={index} onPress={this.Category_List,() => navigation.navigate('NoteInCategory')}>
                            <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c'}}>
                                <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>{item.Title}</Text>
                                <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
                            </View>
                        </TouchableOpacity>)
            });

            return(
                <View style={styles.container}>
                    <TouchableOpacity >
                        <Text>get data</Text>
                    </TouchableOpacity>
                    <ScrollView Style={{flex: 1 , marginHorizontal: 20, justifyContent: 'space-between' }}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                            {Category_List}
                        </View>
                    </ScrollView>
                <StatusBar style="auto" />
                </View>
            )

        }

        else {
            return <View>
                <Text>Loading...</Text>
            </View>
        }
    }
}

export default Category;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10
  },
});




    //         <View style={styles.container}>
    //             <ScrollView Style={{flex: 1 , marginHorizontal: 20, justifyContent: 'space-between' }}>
    //                 <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
    //                     <TouchableOpacity onPress={this.Category_List,() => navigation.navigate('NoteInCategory')}>
    //                         <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c'}}>
    //                             <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>Category Title</Text>
    //                             <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
    //                         </View>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity onPress={this.Category_List ,() => navigation.navigate('NoteInCategory')}>
    //                         <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#c4c4c4'}}>
    //                             <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>Category Title</Text>
    //                             <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
    //                         </View>
    //                     </TouchableOpacity>
    //                 </View>
    //                 {/* <View style={{flex: 1, flexDirection: 'row'}}>
    //                     <TouchableOpacity onPress={this.Category_List ,() => navigation.navigate('NoteInCategory')}>
    //                         <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#c4c4c4'}}>
    //                             <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>Category Title</Text>
    //                             <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
    //                         </View>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity onPress={this.Category_List ,() => navigation.navigate('NoteInCategory')}>
    //                         <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c'}}>
    //                             <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>Category Title</Text>
    //                             <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
    //                         </View>
    //                     </TouchableOpacity>
    //                 </View> */}
    //         </ScrollView>
    //   <StatusBar style="auto" />
    // </View>
