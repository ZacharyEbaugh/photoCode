import React, { startTransition, useState } from 'react';
import PropTypes from 'prop-types';

import LoginSignUp from './Login_SignUpButtons';

import { View, Text, TextInput, Image, Modal, StyleSheet, Dimensions, Pressable, Linking } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

function SignInGoogle({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SignUpButton}
            onPress={() => navigation.navigate(screenName)}
        >
            <Text style={styles.signUpText}>
                Sign Up
            </Text>

        </Pressable>

    );
}

function SignInGitHub({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SignUpButton}
            onPress={() => navigation.navigate(screenName)}
        >
            <Text style={styles.signUpText}>
                Sign Up
            </Text>

        </Pressable>

    );
}

function SignInLinkedIn({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SignUpButton}
            onPress={() => navigation.navigate(screenName)}
        >
            <Text style={styles.signUpText}>
                Sign Up
            </Text>

        </Pressable>

    );
}

function SignInPhotoCode({ screenName }) {
    const navigation = useNavigation();
    const loginURL = 
    'https://photocode.us.auth0.com/login?'
    + 'client=R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs' + '&'
    + 'protocol=oauth2' + '&'
    + 'response_type=code' + '&'
    + 'redirect_uri=https://photocode.app/Home' + '&'
    + 'connection=Username-Password-Authentication' + '&'
    + 'scope=openid%20profile%20email' + '&'
    + 'audience=https://photocode.us.auth0.com/api/v2/'

    return (
        <Pressable style={styles.SignUpButton}
            onPress={() => {
                setLoginVisible(true);
            }
            }
        >
            <Text style={styles.buttonText}>
                Sign In with PhotoCode
            </Text>

        </Pressable>

    );
}



const ChooseLogin = () => {
    const navigation = useNavigation();

    // State variables for displaying each login webview
    const [loginVisible, setLoginVisible] = useState(false);


    // Login urls for all options
    const loginURL = 
        'https://photocode.us.auth0.com/login?'
        + 'client=R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs' + '&'
        + 'protocol=oauth2' + '&'
        + 'response_type=code' + '&'
        + 'redirect_uri=https://photocode.app/Home' + '&'
        + 'connection=Username-Password-Authentication' + '&'
        + 'scope=openid%20profile%20email' + '&'
        + 'audience=https://photocode.us.auth0.com/api/v2/'


    const SignInPhotoCode = () => {
        return (
            <Pressable style={styles.SignUpButton}
                onPress={() => openLinkInAppBrowser({WebURL: loginURL})}
            >
                <Text style={styles.buttonText}>
                    Sign In with PhotoCode
                </Text>

            </Pressable>

        );
    }
    const openLinkInAppBrowser = async({ WebURL }) => {
       
        InAppBrowser.isAvailable().then(() => {
            return InAppBrowser.open(WebURL, {
                // iOS Properties
                animated: true,
                modalEnabled: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
            });
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.PText}>P</Text>
            <Text style={styles.CText}>C</Text>
            <Text style={styles.message}> Welcome{'\n'} Back</Text>
            <SignInPhotoCode/>
            <Modal
                animationType={'slide'}
                visible={loginVisible}
                onRequestClose={() => {setLoginVisible(false)}}
                presentationStyle={'pageSheet'}
            >
                <WebView source={{uri: loginURL}}/>
            </Modal>
             <Pressable style={styles.SignUpButton}
                onPress={() => openLinkInAppBrowser({WebURL: loginURL})}
            >
                <Text style={styles.buttonText}>
                    Sign In with PhotoCode
                </Text>

            </Pressable>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0066FF',
        flexDirection: 'column',
    },
    PText: {
        width: '130%',
        color: '#0049B8',
        fontWeight: 'bold',
        fontSize: 700,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -1,
        elevation: -1,
        top: -200,
        left: -60,
        fontFamily: 'JetBrainsMono-Medium',
    },

    CText: {
        width: '130%',
        color: '#0049B8',
        fontWeight: 'bold',
        fontSize: 700,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -2,
        elevation: -2,
        top: 270,
        left: 60,
        fontFamily: 'JetBrainsMono-Medium',
    },

    message: {
        fontSize: 70,
        color: 'white',
        marginTop: windowHeight * 0.1,
        marginLeft: windowWidth * -0.05,
        fontFamily: 'JetBrainsMono-Medium',
    },

    SignUpButton: {
        height: 80,
        width: 300,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        zIndex: 9999,
        elevation: 9999,
    },

    buttonText: {
        fontSize: 40,
        fontFamily: 'JetBrainsMono-Medium',
    }
});

export default ChooseLogin;