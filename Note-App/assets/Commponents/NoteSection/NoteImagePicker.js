import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Value } from 'react-native-reanimated';

export default function NoteImagesPicker(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(null);
    (async () => {
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
    alert(result.uri)
    props.func(result.uri);
    console.log(result);

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
    console.log(result);

    if (!result.cancelled) {
    setImage(result.uri);
    console.log(image);
    }
  };


  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Open camera" onPress={openCamera} />
      <Text> </Text>
      <Button title="Choose from gallery" onPress={pickImage} />
      {image && <Image source={{ uri:image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
