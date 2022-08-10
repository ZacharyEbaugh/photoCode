import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Linking, Button, TouchableOpacity, Image, TextInput, Dimensions, Alert, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { DemoResponse } from './DemoResponse';


/* toggle includeExtra */
const includeExtra = true;

export default function CameraView() {
  const [response, setResponse] = useState(null);

  const onButtonPress = useCallback((type, options) => {

    if (type === 'capture') {
      launchCamera(options, setResponse);
      console.warn('capture');
    } else {
      launchImageLibrary(options, setResponse);
    }
    // ImagePicker.launchCamera(options, setResponse);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <TouchableOpacity
                style={styles.button}
                key={title}
                onPress={() => onButtonPress(type, options)}>
                <Text>
                    {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <DemoResponse>{response}</DemoResponse>

        {response?.assets &&
          response?.assets.map(({uri}) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={{width: 200, height: 200}}
                source={{uri: uri}}
              />
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {

  },
  button: {
    marginVertical: 20,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
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
  // {
  //   title: `Select Image or Video\n(mixed)`,
  //   type: 'library',
  //   options: {
  //     selectionLimit: 0,
  //     mediaType: 'mixed',
  //     includeExtra,
  //   },
  // },
];
