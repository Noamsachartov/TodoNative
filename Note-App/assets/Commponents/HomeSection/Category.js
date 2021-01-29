import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Button , Modal} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import CategoryModal from './CategoryModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Category extends Component{
    state = {
        Get_Category: [],
        List: '',
        modalVisible: false,
        setModalVisible : false,
        modalComponent : '',
        Delete_Name: ''
    }
    Category_List =() =>{
        console.log("pressed")
    }
    Preference =(CategoryName) => {
        console.log("edit")
        this.setState({
            modalVisible : !this.state.modalVisible,
            Delete_Name: CategoryName
        })
        // const { navigation } = this.props;
        // this._unsubscribe = navigation.addListener('focus', () => {
        //     this.Load();
        // });
    }

    setModalVisible = (name) =>{
        this.setState({
            modalVisible : !this.state.modalVisible,
            Delete_Name: name
        })
        console.log("from modal",name)
    }




    componentDidMount() {
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.Load();
        });
        //    () => navigation.addListener('focus', () => {
        //     this.Load();
        // });
        this.Load();
    }
  

    onFocusFunction = () => {
        console.log("doo something")
      }

    Load = async () => {
        try{
            let Category = await AsyncStorage.getItem("CategoryList");
            if (Category !== null){
                console.log(JSON.parse(Category),"from category");
                this.setState({Get_Category: JSON.parse(Category)})
            }
        } catch (error){
            alert(err);
        }
    }

    renderItem = ({item, index}) => {
        const { navigation } = this.props;
        return (

            <TouchableOpacity  name={item.name} CategoryId={index} key={index} onPress={this.Category_List,() => navigation.navigate('NoteInCategory',{name:item.name})}>
                             <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c', marginBottom: 10                                                }}>
                                 <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>{item.name}</Text>
                                 <Icon onPress={() => this.Preference(item.name)} name="trash" size={25} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', marginTop:40, paddingHorizontal: 20}} />
                             </View>
            </TouchableOpacity>
        )
    }


    render(){
        const { navigation } = this.props;

        if (this.state.Get_Category.length > 0){
            console.log(this.state.Get_Category, "return")

            return(
                <View style={styles.container}>
                      {/* SetMOdal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <CategoryModal
                                modalVisible={() => this.setModalVisible(this.state.Delete_Name)}
                                Delete_Name={this.state.Delete_Name}
                                />
                        </View>
                        </View>
                    </Modal>
             {/* End Modal */}
                    <ScrollView Style={{flex: 1 , marginHorizontal: 20, justifyContent: 'space-between' }}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                             <FlatList 
                                data={this.state.Get_Category}
                                renderItem={this.renderItem}
                                keyExtractor={(item,index) => index.toString()}
                                numColumns={2}                   
                            />    
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
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
