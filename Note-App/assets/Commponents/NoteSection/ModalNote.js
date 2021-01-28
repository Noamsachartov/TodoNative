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
    // this.Load(this.props.Delete_Name)
    console.log("trydelete")
    this.props.modalVisible(false)
  }


  Load = async (name) => {
    try{
      console.log("tr333",name)
      var category = this.props.CategoryName
      console.log(category,"!!!!")
        let Category_note = await AsyncStorage.getItem(category);

        if (Category_note !== null){
            console.log(JSON.parse(Category_note),"from Modal");
            this.setState({Get_Note: JSON.parse(Category_note)})
            var filterd_list = Category_note.filter(item => item.Title != name)
            console.log("---filterd---",filterd_list)
            this.save(filterd_list)
        }
    } catch (error){
        alert(err);
    }
}

save = async (joined) => {
  try {
    var name = `${this.props.CategoryName}`;
    await AsyncStorage.setItem(name, JSON.stringify(joined))
    console.log("after filterd");
  }catch (error){
    alert(error)
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