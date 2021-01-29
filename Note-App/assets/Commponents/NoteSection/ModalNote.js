import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableHighlight,
  Linking,
  Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DiscountModal extends Component {
  state = {
    ShowOtp: false,
  }

  HideModalHandler = () =>{
      this.props.modalVisible(false);
  }

  DeleteNote = () =>{
    console.log(this.props.Delete_Name, "from insideee")
    // this.Load(this.props.Delete_Name)
    
    console.log("trydelete")
    this.removeNote(this.props.Delete_Name)
    this.props.modalVisible(false)
  }

  removeNote = async (ItemName) => {
    try{
      var Item = `${ItemName}`;
      var CategoryName = `${this.props.CategoryName}`;
      const posts = await AsyncStorage.getItem(CategoryName);
      let postsJson = JSON.parse(posts);
      const postFilterd = postsJson.filter(function(e){return e.Title != Item})
      console.log("after delete", postFilterd);

      //Updating Notes In Category
      await AsyncStorage.setItem(CategoryName, JSON.stringify(postFilterd))


    } catch (error){
      console.log('error', error)
    }
  }


 render() {

    var modalComponent = <View style={{height: 100}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.buissnes_name}</Text>
                            <Text>Sure you want to Delete note?</Text>
                              <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-end'}}>   
                                <TouchableHighlight style={{flex:1}}>
                                            <Button onPress={this.HideModalHandler}  title="לא"/>
                                </TouchableHighlight>
                                <TouchableHighlight style={{flex:1}} >
                                            <Button onPress={this.DeleteNote} title="כן"/>
                                </TouchableHighlight>
                              </View>
                            </View>    
    return ( <View>
                {this.state.ShowOtp? "": modalComponent}
            </View>
        
    )
  }
}


export default DiscountModal;