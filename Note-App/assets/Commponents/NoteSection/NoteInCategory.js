import { StatusBar } from 'expo-status-bar';
import React , { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button ,SafeAreaView } from 'react-native';
import Note from './Note';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity} from 'react-native-gesture-handler'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteImagesPicker from './NoteImagePicker';
import * as ImagePicker from 'expo-image-picker';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class NoteInCategory extends Component{
  state = {
    Get_Note: [],
    CategoryName: '',
    Title: '',
    Description: '',
    Img:'',
    afterImg: false
  }

    Add_Note = () => {
        console.log("Add Note")
        if(this.state.Title.length > 0 && this.state.Description.length > 0){
          var new_note = {
            Title: this.state.Title,
            Description: this.state.Description,
            Img: this.state.Img
        }
        var joined = this.state.Get_Note.concat(new_note);
        this.setState({Get_Note: joined})         
        console.log("uril")
        console.log(joined)
        this.setState({Title: '', Description: '',Img:''})
        this.save(joined);
        }else if (this.state.Title.length < 1){
          alert("Dont forget the Note Title")
        }else if (this.state.Title.length > 0 && this.state.Description.length < 1) {
          alert("Dont forget the Note Description")
        }
    }

    

    componentDidMount() {
      this.setState({CategoryName: this.props.route.params.name})          
      this.Load();
      
  }



  save = async (joined) => {
    try {
      var name = `${this.props.route.params.name}`;
      await AsyncStorage.setItem(name, JSON.stringify(joined))
      console.log("New Item saved");
    }catch (error){
      alert(error)
    }
  }

  getId2RemoveFromChild = (url) => {
    this.setState({ Img: [url] })
      alert(this.state.Img)
   console.log("In1:" , url);

  }

  Load = async () => {
   
      try{
          var name = `${this.props.route.params.name}`;
          let Category_note = await AsyncStorage.getItem(name);

          if (Category_note !== null){
              console.log(JSON.parse(Category_note),"from category");
              this.setState({Get_Note: JSON.parse(Category_note)})
          }
      } catch (error){
          alert(err);
      }
  }

  isrender = (isdelete) =>{
    if(isdelete == true){
      this.Load();
    }
  }

  render(){

    if(this.state.Get_Note){
      console.log("there is data")

      return (
        <View>
            <ScrollView showsVerticalScrollIndicator ={false}>
            {/* <SafeAreaView style={{flex: 1}}> */}
            <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
           
                <Text style={{fontSize: 40, marginTop: 10, color: '#2c5c8c'}}>{this.state.CategoryName} Notes</Text>
               
                <Note needrender={this.isrender} Data={this.state.Get_Note} CategoryName={this.state.CategoryName} />
                  <View style={{borderColor: "#2c5c8c", borderWidth: 5}}>
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                        <View>
                          <TouchableHighlight>
                          <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', marginRight: 10,  color: '#2c5c8c'}} />
                          </TouchableHighlight >
                        </View>
                        <View>
                          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#2c5c8c', marginTop: 15, marginRight: 15}}>Add New Note</Text>
                        </View>
                    </View>
                  
                  <TextInput
                    placeholder="Type here New Title Item!"
                    onChangeText={(Title) => this.setState({Title})}
                    value={this.state.Title}
                    contentSize={100, 100}
                  />
                  <TextInput
                    placeholder="Type here New Description!"
                    onChangeText={(Description) => this.setState({Description})}
                    value={this.state.Description}
                    contentSize={100, 100}
                  />
                  <NoteImagesPicker status={this.isrender}  func = {this.getId2RemoveFromChild} /> 
                </View>
            </View>
            {/* </SafeAreaView> */}
            </ScrollView> 
    </View>
  );}
  else {
    console.log("there is nooooo data")
    return(
      <View>
         <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
           <Text style={{fontSize: 40, marginTop: 10, color: '#2c5c8c'}}>{this.state.CategoryName} Notes</Text>
           <Note needrender={this.isrender} Data={this.state.Get_Note} CategoryName={this.state.CategoryName} />
             <View style={{borderColor: "#2c5c8c", borderWidth: 5}}>
               <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                   <View>
                     <TouchableHighlight>
                     <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', marginRight: 10,  color: '#2c5c8c'}} />
                     </TouchableHighlight >
                   </View>
                   <View>
                     <Text style={{fontSize: 30, fontWeight: 'bold', color: '#2c5c8c', marginTop: 15, marginRight: 15}}>Add New Note</Text>
                   </View>
               </View>
             <TextInput
               placeholder="Type here New Title Item!"
               onChangeText={(Title) => this.setState({Title})}
               value={this.state.Title}
               contentSize={100, 100}
             />
             <TextInput
               placeholder="Type here New Description!"
               onChangeText={(Description) => this.setState({Description})}
               value={this.state.Description}
               contentSize={100, 100}
             />
             <NoteImagesPicker status={this.isrender}  func = {this.getId2RemoveFromChild} /> 
           </View>
       </View>
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




// <View>
// <ScrollView showsVerticalScrollIndicator ={false}>
// <View style={{flex: 1, flexDirection: 'column', marginBottom: 250}}>
// <TouchableHighlight>
//       <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', margin: 21}} />
// </TouchableHighlight >
//     <Text style={{fontSize: 40, marginTop: 10, color: '#2c5c8c'}}>Category Name</Text>
//     <TouchableHighlight>
//             <Icon onPress={this.Add_Note} name="plus" size={70} style={{color:'black', margin: 21}} />
//           </TouchableHighlight >
//           <TextInput
//             placeholder="Type here New Title Item!"
//             onChangeText={(Title) => this.setState({Title})}
//             value={this.state.Title}
//             contentSize={100, 100}
//           />
//           <TextInput
//             placeholder="Type here New Description!"
//             onChangeText={(Description) => this.setState({Description})}
//             value={this.state.Description}
//             contentSize={100, 100}
//           />
//           <NoteImagesPicker func = {this.getId2RemoveFromChild} /> 

// </View>
// </ScrollView> 
// </View>