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
import { useAuth0 } from 'react-native-auth0';
const showAlert = () => {
    const { clearSession } = useAuth0();
    Alert.alert(
        "Are you\nsure?",
        "",
        [
            {
                text: 'Logout',
                onPress: () => {
                    clearSession();
                }
            },
            {
                text: 'Cancel',
                onPress: () => console.warn('canceled'),
            },
        ],
    );
    };

export function GoToLogout(props) {
    const { clearSession } = useAuth0();
    const [isPressed, setIsPressed] = useState(false);
    console.log(props.closeSideBar)

    const onLogout = async () => {
        console.log("Logging out...");
        try {
            await clearSession({
                prompt: 'login',
            },
            {
                ephemeralSession: true,
            });

            props.setUser(null);
        } catch (e) {
            console.log('Log out cancelled');
        }
    };

    return (
        <Pressable
            onPress={() => {
                onLogout();
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
        width: windowWidth * 0.69,
    },
    updateBackground: {
        backgroundColor: '#C2C2C2',
    },
    options: {
        marginLeft: windowWidth * 0.05,
        fontSize: windowWidth * 0.09,
        fontFamily: 'JetBrainsMono-Bold',
    },
});
