import { StatusBar } from 'expo-status-bar';
import React , { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button  } from 'react-native';
import Note from './Note';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity} from 'react-native-gesture-handler'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class NoteInCategory extends Component{
  state = {
    Get_Note: [],
    CategoryName: ''
  }

    Add_Note = () => {
        console.log("Add Note")
        this.save();

    }

    

    componentDidMount() {
      // this.setState({CategoryName: this.props.route.params.name})    
      this.setState({CategoryName: "school"})

      // this.removeItemValue();
      
      this.Load();
  }

  async removeItemValue() {
    try {
        await AsyncStorage.removeItem("school");
        return true;
    }
    catch(exception) {
        return false;
    }
}


  save = async () => {
    var new_note = [{
      Title: "home diy",
      Description: "bla bla bla bla bla bla"
    }]
    try {
      await AsyncStorage.setItem("school", JSON.stringify(new_note))
      console.log("New Item saved");
    }catch (error){
      alert(error)
    }
  }



  Load = async () => {
   
      try{
        console.log("tryyy")
          // let Category_note = await AsyncStorage.getItem(this.props.route.params.name);
          let Category_note = await AsyncStorage.getItem("school");

          if (Category_note !== null){
              console.log(JSON.parse(Category_note),"from category");
              this.setState({Get_Note: JSON.parse(Category_note)})
          }
      } catch (error){
          alert(err);
      }
  }


  render(){
    
    console.log(this.state.CategoryName)

    if(this.state.Get_Note){
      console.log("there is data")

      return (
        <View>
            <ScrollView showsVerticalScrollIndicator ={false}>
            <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
            <TouchableHighlight>
                  <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', margin: 21}} />
            </TouchableHighlight >
                <Text style={{fontSize: 40, marginTop: 10, color: '#2c5c8c'}}>Category Name</Text>
                <Note Data={this.state.Get_Note} />
            </View>
            
            </ScrollView> 
    </View>
  );}
  else {
    console.log("there is nooooo data")
    return(
      <View>
      <ScrollView showsVerticalScrollIndicator ={false}>
      <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
      <TouchableHighlight>
            <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', margin: 21}} />
      </TouchableHighlight >
          <Text style={{fontSize: 40, marginTop: 10, color: '#2c5c8c'}}>Category Name</Text>
          {/* <Note /> */}
      </View>
      </ScrollView> 
</View>
    )
  }
   
  }

}

export default NoteInCategory

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


