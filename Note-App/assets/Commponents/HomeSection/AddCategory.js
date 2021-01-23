import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AddCategory extends Component {
  state = {
    Title: '',
    Category_list: []
  }

  HandlePost =() =>{
      console.log(this.state.Title+"dfgdfg");
      this.setState({Category_list: this.state.Category_list.push(this.state.Title)})
      _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            '@CategoryList:key',JSON.stringify(this.state.Category_list)
            
          );console.log("added")
        } catch (error) {
          // Error saving data
          console.log("errorr")
        }
      };
  }

 render() {
    const { navigation } = this.props;
    return ( <View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-between',alignItems: 'center', marginVertical: 20}}>
                    <View style={{height: 80,width: windowWidth/1.3}} >
                        <TextInput
                                style={{ borderWidth: 5,height: 50,paddingRight:10, borderRadius: 10, borderColor: '#2c5c8c'}}
                                placeholder="Type here Your New Category!"
                                onChangeText={(Title) => this.setState({Title})}
                                value={this.state.Title}
                                contentSize={100, 100}
                
                            />
                    </View>
                    <View style={{height: 60,width:windowWidth/2,padding:13,borderRadius:20 ,backgroundColor: '#2c5c8c'}}>
                        <TouchableOpacity onPress={this.HandlePost} style={styles.appButtonContainer}>
                            <Text style={styles.appButtonText} >Add Crategory</Text>
                        </TouchableOpacity>
                    </View>

                </View>


        </View> 
    )
  }
}


export default AddCategory;


const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
    
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });