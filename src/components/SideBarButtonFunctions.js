import React from 'react';
import PropTypes from 'prop-types';

import { Pressable, Text, Alert, Dimensions, StyleSheet } from 'react-native';

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


export function GoToAbout() {
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);
    return (
        <Pressable
            onPress={() => {
                navigation.navigate('About Us');
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
                {'About Us'}
            </Text>
        </Pressable>
    );
}


export function GoToContact() {
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);
    return (
        <Pressable
            onPress={() => {
                navigation.navigate('Contact Us');
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
                {'Contact Us'}
            </Text>
        </Pressable>
    );
}

const showAlert = () =>
    Alert.alert(
        "Are you\nsure?",
        "",
        [
            {
                text: 'Logout',
                onPress: () => console.warn('logged out'),
            },
            {
                text: 'Cancel',
                onPress: () => console.warn('canceled'),
            },
        ],
    );


export function GoToLogout() {
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);
    return (
        <Pressable
            onPress={() => {
                [showAlert(), navigation.navigate('SplashPage')];
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
                {'Logout'}
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
