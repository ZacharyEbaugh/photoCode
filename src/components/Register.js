import React, { startTransition } from 'react';
import PropTypes from 'prop-types';

import SignUpLogin from './SignUp_LoginButtons';

import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Register extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.PText}>P</Text>
                <Text style={styles.CText}>C</Text>
                <Text style={styles.message}> Create{'\n'} Account</Text>
                <View style={styles.inputBox}>
                    <View style={styles.Name}>
                        <Image style={styles.NameIcon} source={require('../assets/images/NameIcon.png')} />
                        <TextInput style={styles.NameInput} placeholder="Name"></TextInput>
                    </View>
                    <View style={styles.Email}>
                        <Image style={styles.MailIcon} source={require('../assets/images/MailIcon.png')} />
                        <TextInput style={styles.EmailInput} placeholder="Photo@gmail.com"></TextInput>
                    </View>
                    <View style={styles.Password}>
                        <Image style={styles.PasswordIcon} source={require('../assets/images/PasswordIcon.png')} />
                        <TextInput style={styles.PasswordInput} placeholder="Password"></TextInput>
                    </View>
                    <SignUpLogin />

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
    },

    message: {
        fontSize: 90,
        color: 'white',
        marginTop: windowHeight * 0.1,
    },

    inputBox: {
        height: windowHeight * 0.9,
        width: windowWidth,
        marginTop: windowHeight * 0.07,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    Name: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginTop: 30,
        // marginBottom: 30,
    },

    NameInput: {
        flex: 1,
        fontSize: 25,
        marginLeft: 10,
    },

    NameIcon: {
        padding: 10,
        margin: 5,
        height: 30,
        width: 35,
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
        marginTop: 30,
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
        marginLeft: 8,
        height: 35,
        width: 30,
        alignItems: 'center',
    },

});

export default Register;