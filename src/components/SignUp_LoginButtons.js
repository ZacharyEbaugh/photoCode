import React from 'react';

import Login from './Login';

import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const actionNames = ['Login', 'Sign Up'];

import { useNavigation } from '@react-navigation/native';

function LoginButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.LoginButton}
            onPress={() => navigation.navigate(screenName)}
        >
            <Text style={styles.loginText}>
                Login
            </Text>

        </Pressable>

    );
}

function SignUpButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SignUpButton}
            onPress={() => 
                [Alert.alert("Verify Email"),
                navigation.navigate(screenName)]}
        >
            <Text style={styles.signUpText}>
                Sign Up
            </Text>

        </Pressable>

    );
}

class Login_SignUp extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <SignUpButton screenName={Login} action={1} />
                </View>
                <View style={styles.line}></View>
                <View>
                    <LoginButton screenName={Login} action={0} />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    SignUpButton: {
        height: 80,
        width: 300,
        backgroundColor: '#0066FF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        zIndex: 9999,
        elevation: 9999,
    },

    LoginButton: {
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

    loginText: {
        fontSize: 40,
    },

    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: windowWidth * 0.8,
        marginBottom: 10,
    },

    signUpText: {
        fontSize: 40,
    }
});


export default Login_SignUp;
