import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Modal } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import NoteModal from './ModalNote';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Note extends Component{
    state = {
        modalVisible: false,
        setModalVisible : false,
        modalComponent : ''
    }

    setModalVisible = () =>{
        this.setState({
            modalVisible : !this.state.modalVisible 
        })
    }

    render(){

        return (
        <View>
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
                <NoteModal
                         modalVisible={() => this.setModalVisible()}
                         />
                </View>
                </View>
            </Modal>
             {/* End Modal */}
            <View style={styles.container}>
                <ScrollView Style={{flex: 1 , marginHorizontal: 10,  justifyContent: 'space-between' }}>
                    <View style={{flex: 1, flexDirection: 'column', marginBottom: 10}}>
                            <View style={{width: windowWidth -10, height: 150, marginHorizontal: 5, marginVertical: 8 ,borderRadius:15 , backgroundColor: '#ccddee'}}>
                                <Text style={styles.Note_Title}>Note Title</Text>
                                <Text style={styles.Note_Description}>Go home and do the assignment, after this call to your team and update then about the result</Text>
                                <Icon onPress={this.setModalVisible} name="edit" size={30} style={{color:'#2c5c8c', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
                            </View>
                            <View style={{width: windowWidth -10, height: 150 , marginHorizontal: 5, borderRadius:15 , backgroundColor: '#ccddee'}}>
                                <Text style={styles.Note_Title}>Note Title</Text>
                                <Text style={styles.Note_Description}>Go home and do the assignment, after this call to your team and update then about the result</Text>
                                <Icon onPress={this.setModalVisible} name="edit" size={30} style={{color:'#2c5c8c', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
                            </View>            
                    </View>
                </ScrollView>
            <StatusBar style="auto" />
            </View>
        </View>  
        )
    }
}

export default Note;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
      },
      Note_Title: {
        margin: 5, color: '#2c5c8c', fontWeight: 'bold', fontSize: 30
      },
      Note_Description: {
        color: '#2c5c8c', margin: 5
      },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
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