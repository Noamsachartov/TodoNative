import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GalleryIcon from 'react-native-vector-icons/FontAwesome';
import PhotoIcon from 'react-native-vector-icons/AntDesign';


import Constants from 'expo-constants';
import { Value } from 'react-native-reanimated';

export default function NoteImagesPicker(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(null);
    (async () => {
      setImage(null);
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    props.func(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    props.func(result.uri);

    if (!result.cancelled) {
    setImage(result.uri);
    }
  };


  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , flexDirection: 'row' }}>
      <GalleryIcon name="picture-o" size={50} onPress={pickImage} style={{marginRight: 20,  color: '#2c5c8c'}}  />
      <PhotoIcon name="camera" size={50} title="Open camera" onPress={openCamera} style={{ color: '#2c5c8c'}} />
      {image && <Image source={{ uri:image }} style={{ width: 150, height: 150 }} />}
      {/* {<Image source={{ uri:image }} style={{ width: 150, height: 150 }} />} */}
    </View>
  );
}
