import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Linking, Button, TouchableOpacity, Image, TextInput, Dimensions, Alert, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//
//
// /* toggle includeExtra */


import { useNavigation } from '@react-navigation/native';

// const devices = await Camera.getAvailableCameraDevices();

const includeExtra = true;

export default function CameraView() {
    const [cameraPermission, setCameraPermission] = useState();
    const [microphonePermission, setMicrophonePermission] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
      Camera.getCameraPermissionStatus().then(setCameraPermission(current => !current));
      Camera.getMicrophonePermissionStatus().then(setMicrophonePermission(current => !current));
    }, []);



    // console.warn(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`);

    if (cameraPermission == null || microphonePermission == null) {
      console.warn('help');
      return null;
  }

  // const devices = useCameraDevices();
  // const device = devices.back;



  return(
        <View style={styles.container}>
            <Pressable
                style={[isPressed && styles.opacity]}
                onPress={() =>{
                    navigation.navigate('ActualCamera');
                }}
                onPressIn={() => {
                    setIsPressed(current => !current);
                }}
                onPressOut={() => {
                    setIsPressed(current => !current);
                }}
            >
                <Text style={styles.header}>
                    {'To Camera'}
                </Text>
            </Pressable>
        </View>
  );

  // const [response, setResponse] = useState(null);
  //
  // const onButtonPress = useCallback(async(type, options) => {
  //
  //   if (type === 'capture') {
  //       const result = await launchCamera(options);
  //       if (result)
  //       {
  //           await launchCamera(options);
  //           console.warn('capture');
  //       }
  //
  //   } else {
  //     // ImagePicker.launchImageLibrary(options, setResponse);
  //   }
  //   // ImagePicker.launchCamera(options, setResponse);
  // }, []);

  // return (
    // <SafeAreaView style={styles.container}>
    //   <Text>🌄 React Native Image Picker</Text>
    //   <ScrollView>
    //     <View style={styles.buttonContainer}>
    //       {actions.map(({title, type, options}) => {
    //         return (
    //           <TouchableOpacity
    //             key={title}
    //             onPress={() => onButtonPress(type, options)}>
    //             <Text>
    //                 {title}
    //             </Text>
    //           </TouchableOpacity>
    //         );
    //       })}
    //     </View>
    //     <Text>{response}</Text>
    //
    //     {response?.assets &&
    //       response?.assets.map(({uri}) => (
    //         <View key={uri} style={styles.image}>
    //           <Image
    //             resizeMode="cover"
    //             resizeMethod="scale"
    //             style={{width: 200, height: 200}}
    //             source={{uri: uri}}
    //           />
    //         </View>
    //       ))}
    //   </ScrollView>
    // </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    // justifyContent: "center",
    alignItems: 'center',

  },
  header: {
      marginTop: 50,
      fontSize: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
  opacity: {
      opacity: 0.5,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
