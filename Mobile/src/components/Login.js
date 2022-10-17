import React, { startTransition } from 'react';
import PropTypes from 'prop-types';

import LoginSignUp from './Login_SignUpButtons';

import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Login extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.PText}>P</Text>
                <Text style={styles.CText}>C</Text>
                <Text style={styles.message}> Welcome{'\n'} Back</Text>
                <View style={styles.inputBox}>
                    <View style={styles.Email}>
                        <Image style={styles.MailIcon} source={require('../assets/images/MailIcon.png')} />
                        <TextInput style={styles.EmailInput} placeholder="Photo@gmail.com"></TextInput>
                    </View>
                    <View style={styles.Password}>
                        <Image style={styles.PasswordIcon} source={require('../assets/images/PasswordIcon.png')} />
                        <TextInput style={styles.PasswordInput} placeholder="Password"></TextInput>
                    </View>
                    <LoginSignUp/>

                </View>
            </View>

        );
    };
}


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

    inputBox: {
        height: windowHeight * 0.6,
        width: windowWidth,
        marginTop: windowHeight * 0.15,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    Email: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginTop: windowHeight * 0.05,
        marginBottom: 30,
    },

    EmailInput: {
        flex: 1,
        fontSize: 25,
        marginLeft: 10,
    },

    MailIcon: {
        padding: 10,
        margin: 5,
        height: 30,
        width: 35,
        alignItems: 'center',
    },

    Password: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginBottom: 30,
    },

    PasswordInput: {
        flex: 1,
        fontSize: 25,
        marginLeft: 10,
    },

    PasswordIcon: {
        padding: 10,
        margin: 5,
        height: 35,
        width: 30,
        alignItems: 'center',
    },

});

export default Login;