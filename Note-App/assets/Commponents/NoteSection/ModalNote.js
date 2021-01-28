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
    this.props.modalVisible(false)
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