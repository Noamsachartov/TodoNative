import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Button , Modal} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
        Delete_Name: '',
        AllKeys: []
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
    }

    setModalVisible = (name) =>{
        this.setState({
            modalVisible : !this.state.modalVisible,
            Delete_Name: name
        })
    }




    componentDidMount() {
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.Load();
        });
        this.Load();
    }


    Load = async () => {
        this.setState({AllKeys: []})
        try{
            let Category = await AsyncStorage.getItem("CategoryList");
            if (Category !== null){
                this.setState({Get_Category: JSON.parse(Category)})
                var parsecategory = JSON.parse(Category)
                var categoryNames_temp =[];
                   
                 var xx =  parsecategory.map((item) => {
                     return(
                        categoryNames_temp.push(item.name)
                     )})
                
                    var res = [];
                    
                    AsyncStorage.multiGet(categoryNames_temp, (err, stores) => {
                      stores.map((result, i, store) => {
                        let key = store[i][0];
                        let value = store[i][1];
                        if (value){
                            var parser = JSON.parse(value,"parser")
                            res.push(key,parser.length)
                            var newkeyValue = [key,parser.length]
                            var joined = this.state.AllKeys.concat(newkeyValue);
                            this.setState({AllKeys: joined})
                        }
                      });
                    });
            }
        } catch (error){
            alert(err);
        }
    }

      
    isdeleted = (isdelete) => {
        if(isdelete == true){
            this.Load();
          }
    }

    renderItem = ({item, index}) => {
        const { navigation } = this.props;
        var getLength = 0;
        for (let i = 0; i < this.state.AllKeys.length; i++) {
            let element = this.state.AllKeys;
            if(element[i] == item.name){
                getLength = element[i+1];
            }
        }
        return (

            <TouchableOpacity  name={item.name} CategoryId={index} key={index} onPress={this.Category_List,() => navigation.navigate('NoteInCategory',{name:item.name})}>
                             <View style={styles.renderView}>
                                 <View style={styles.secondView}>
                                     <View>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                     </View>
                                     <View>
                                        <Text style={styles.getlength}>{getLength}</Text>
                                     </View>
                                 </View>
                                 <Icon onPress={() => this.Preference(item.name)} name="trash" size={25} style={styles.iconTrash} />
                             </View>
            </TouchableOpacity>
        )
    }


    render(){
        const { navigation } = this.props;

        if (this.state.Get_Category.length > 0){
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
                                isdeleted={this.isdeleted}
                                />
                        </View>
                        </View>
                    </Modal>
             {/* End Modal */} 
                             <FlatList 
                                data={this.state.Get_Category}
                                renderItem={this.renderItem}
                                keyExtractor={(item,index) => index.toString()}
                                numColumns={2}                   
                            />    
                <StatusBar style="auto" />
                </View>
            )
        }

        else {
            return <View>
                <Text>Click on the Plus to add category</Text>
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
  },
  renderView: {width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c', marginBottom: 10},
  secondView: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
  itemName: {margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30},
  getlength: {fontSize: 25, color: 'whitesmoke', marginRight: 25, marginTop: 10},
  iconTrash: {color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-end', marginTop:40, paddingHorizontal: 20}
});

