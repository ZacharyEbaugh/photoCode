import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Pressable, Text, Linking, Button, TouchableOpacity, Image, TextInput, Dimensions, Alert, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera';
import { Camera, frameRateIncluded } from 'react-native-vision-camera';


export default function ActualCamera() {
  const devices = useCameraDevices();
  const device = devices.back;

  // if (device == null) return <LoadingView />
  return (
    <Camera
      style={styles.absoluteFill}
      device={device}
    />
  )
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
