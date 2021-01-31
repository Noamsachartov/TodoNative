import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
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
      //Updating Notes In Category
      await AsyncStorage.setItem(CategoryName, JSON.stringify(postFilterd))
      this.props.needrender(1);
    } catch (error){
      console.log('error', error)
    }
  }


 render() {
    var modalComponent = <View style={styles.mainView}>
                            <Text>Sure you want to Delete note?</Text>
                              <View style={styles.secondView}>   
                                <TouchableHighlight style={styles.no}>
                                            <Button onPress={this.HideModalHandler}  title="No"/>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.yes} >
                                            <Button onPress={this.DeleteNote} title="Yes"/>
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


const styles = StyleSheet.create({
  mainView: {height: 100},
  text: {fontWeight: 'bold', fontSize: 20},
  secondView: {flex:1, flexDirection: 'row', alignItems: 'flex-end'},
  no: {flex:1, marginHorizontal: 10},
  yes: {flex:1}
  })