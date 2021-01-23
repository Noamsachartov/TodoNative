import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Button } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Category extends Component{
    state = {
        Get_Category: [],
        List: ''
    }
    Category_List =() =>{
        console.log("pressed")
    }
    Preference =() => {
        console.log("edit")
    }



    componentDidMount() {
        this.Load();
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

    _renderItem = ({item, index}) => {
        const { navigation } = this.props;
        return (

            <TouchableOpacity  name={item.name} CategoryId={index} key={index} onPress={this.Category_List,() => navigation.navigate('NoteInCategory')}>
                             <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c'}}>
                                 <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>{item.name}</Text>
                                 <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
                             </View>
            </TouchableOpacity>
        )
    }


    render(){
        const { navigation } = this.props;

        var Category_List = '';
        if (this.state.Get_Category.length > 0){
            console.log(this.state.Get_Category, "return")
            var Category_List = this.state.Get_Category.map((item,index) => {
                return (<TouchableOpacity name={item.Title} CategoryId={item.Id} key={index} onPress={this.Category_List,() => navigation.navigate('NoteInCategory')}>
                            <View style={{width: windowWidth/2 -10, height: 150, backgroundColor: 'red', marginHorizontal: 5, borderRadius:15 , backgroundColor: '#2c5c8c'}}>
                                <Text style={{margin: 5, color: 'whitesmoke', fontWeight: 'bold', fontSize: 30}}>{item.Title}</Text>
                                <Icon onPress={this.Preference} name="sound-mix" size={30} style={{color:'whitesmoke', flex: 1, flexDirection: 'row', alignSelf: 'flex-start', margin: 8}} />
                            </View>
                        </TouchableOpacity>)
            });

            return(
                <View style={styles.container}>
                    <ScrollView Style={{flex: 1 , marginHorizontal: 20, justifyContent: 'space-between' }}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                            {/* {Category_List} */}
                 
                             <FlatList 
                                data={this.state.Get_Category}
                                renderItem={this._renderItem}
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
