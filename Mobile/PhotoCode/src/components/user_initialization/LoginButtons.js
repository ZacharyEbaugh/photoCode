import {useNavigation} from '@react-navigation/native';

import { View, Text, TextInput, Image, Modal, StyleSheet, Dimensions, Pressable, Linking } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import googleLogo from './../../assets/images/googleLogo.png';
import githubLogo from './../../assets/images/github-mark-white.png';
import LinkedInLogo from './../../assets/images/LinkedInLogo.png';

import { useAuth0 } from 'react-native-auth0';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const LoginButtons = (props) => {
    const {authorize, user, clearSession} = useAuth0({
        clientId: "MpksNgQRuYsc9tp9ZJcsgODwhOqjbn1n",
        domain: "photocode.us.auth0.com",
        redirectUri: "org.reactjs.native.example.PhotoCode://photocode.us.auth0.com/ios/org.reactjs.native.example.PhotoCode/callback",
        audience: "https://photocode.auth0.com/api/v2/",
    });

    const navigate = useNavigation();

    const photocodeAuth = async () => {
        try {
            await authorize({
                connection: 'Username-Password-Authentication',
            })
            .then(() => {
                if (successLogin())
                    navigate.navigate('HomeScreen');
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    };

    const googleAuth = async () => {
        try {
            await authorize({
                connection: 'google-oauth2',
            })
            .then(() => {
                if (successLogin())
                    navigate.navigate('HomeScreen');
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    };

    const githubAuth = async () => {
        try {
            await authorize({
                connection: 'github',
            })
            .then(() => {
                if (successLogin())
                    navigate.navigate('HomeScreen');
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    };

    const linkedinAuth = async () => {
        try {
            await authorize({
                connection: 'linkedin',
            })
            .then(() => {
                if (successLogin())
                    navigate.navigate('HomeScreen');
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    };

    const successLogin = () => {
        if (user != null)
            return true;
        else
            return false;
    };

    useEffect(() => {
        props.setUser(user);
        if (user != null)
        {
            AsyncStorage.setItem('user_picture', JSON.stringify(user.picture));
            console.warn(user.picture);

        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Pressable onPress={googleAuth} style={styles.authButton} title="Log in">
                <Image source={googleLogo} style={styles.googleLogo}/>
                <Text style={styles.buttonText}>
                    Continue with Google
                </Text>
            </Pressable>
            <Pressable onPress={githubAuth} style={styles.githubButton} title="Log in">
                <Image source={githubLogo} style={styles.githubLogo}/>
                <Text style={styles.githubText}>
                    Continue with GitHub
                </Text>
            </Pressable>
            <Pressable onPress={linkedinAuth} style={styles.linkedinButton} title="Log in">
                <Image source={LinkedInLogo} style={styles.LinkedInLogo}/>
                <Text style={styles.linkedinText}>
                    Continue with LinkedIn
                </Text>
            </Pressable>
            <Pressable onPress={photocodeAuth} style={styles.authButton} title="Log in">
                <Text style={styles.buttonText}>
                    Login or Register
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: windowHeight * 0.4,
    },

    authButton: {
        height: 70,
        width: 360,
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 7,
        padding: 10,
        alignSelf: 'center',
        
    },

    githubButton: {
        height: 70,
        width: 360,
        backgroundColor: 'black',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 7,
        padding: 10,
        alignSelf: 'center',
    },

    linkedinButton: {
        height: 70,
        width: 360,
        backgroundColor: '#0A66C2',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 7,
        padding: 10,
        alignSelf: 'center',
    },

    linkedinText: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'JetBrainsMono-Regular',
    },

    githubText: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'JetBrainsMono-Regular',
    },

    googleLogo: {
        height: 30,
        width: 30,
        padding: 20,
        marginRight: 10,
    },

    githubLogo: {
        height: 30,
        width: 30,
        padding: 20,
        marginRight: 10,
        color: 'white'
    },

    LinkedInLogo: {
        height: 30,
        width: 30,
        padding: 20,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 8,
    },


    buttonText: {
        fontSize: 22,
        fontFamily: 'JetBrainsMono-Regular',
    }
});