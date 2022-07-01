import React from 'react';
import PropTypes from 'prop-types';

import { Pressable, Text, Dimensions, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';

const windowWidth = Dimensions.get('window').width;

export function GoToSettings() {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
        onPress={() => {
            navigation.navigate('Settings');
        }}
        onPressOut={() => {
            setIsPressed(current => !current);
        }}
        onPressIn={() => {
           setIsPressed(current => !current);
        }}
        style={[styles.button, isPressed && styles.updateBackground]}
    >
        <Text style={styles.options}>
            {'Settings'}
        </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        width: windowWidth * 0.66 - 3,
    },
    updateBackground: {
        backgroundColor: '#C2C2C2',
    },
    options: {
        marginLeft: 20,
        fontSize: 25,
    },
});
