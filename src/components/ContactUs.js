import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import HomeScreen from './HomeScreen';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function GoToButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable
            // title={`Go to ${screenName}`}
            onPress={() => navigation.navigate(screenName)}
        >
            <Text style={styles.backText}>
                {'< Back'}
            </Text>
        </Pressable>

    );
}


function SendButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SendButton}
            onPress={() => 
                [Alert.alert("Message Sent"),
                navigation.navigate(screenName)]}
        >
            <Text style={styles.SendText}>
                Send
            </Text>

        </Pressable>

    );
}

class ContactUs extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName={HomeScreen}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.title}>Contact Us</Text>
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.inputBox}>
                        <View style={styles.Name}>
                            <Image style={styles.NameIcon} source={require('../assets/images/NameIcon.png')} />
                            <TextInput style={styles.NameInput} placeholder="Name"></TextInput>
                        </View>
                        <View style={styles.Email}>
                            <Image style={styles.MailIcon} source={require('../assets/images/MailIcon.png')} />
                            <TextInput style={styles.EmailInput} placeholder="Photo@gmail.com"></TextInput>
                        </View>
                        <View style={styles.Subject}>
                            <Image style={styles.SubjectIcon} source={require('../assets/images/SubjectIcon.png')} />
                            <TextInput style={styles.SubjectInput} placeholder="Subject"></TextInput>
                        </View>
                        <View style={styles.Message}>
                            <TextInput 
                                style={styles.MessageInput}
                                multiline={true}
                                numberOfLines={'auto'}
                                placeholder="Type your message here."
                            ></TextInput>
                        </View>
                        <SendButton screenName={HomeScreen}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    header: {
        backgroundColor: '#0066FF',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'space-around',
        
    },

    backButton: {
        marginTop: 40,
        marginLeft: 10,
    },
    backText: {
        fontSize: 20,
        color: '#FFFFFF',
    },

    title: {
        fontSize: 40,
        // marginTop: -100,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        // fontFamily: 'JetBrainsMono-Regular',
    },

    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
    },


    inputBox: {
        height: windowHeight * 0.9,
        width: windowWidth,
        // marginTop: windowHeight * 0.07,
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
        marginTop: windowHeight * 0.02,
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
        marginTop: windowHeight * 0.06,
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

    Subject: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginTop: windowHeight * 0.06,
    },

    SubjectInput: {
        flex: 1,
        fontSize: 25,
        marginLeft: 10,
    },

    SubjectIcon: {
        padding: 10,
        margin: 5,
        marginLeft: 8,
        height: 30,
        width: 30,
        alignItems: 'center',
    },

    Message: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: windowHeight * 0.01,
    },

    MessageInput: {
        color: 'black',
        fontSize: 20,
        width: windowWidth * 0.76,
        height: windowHeight * 0.33,
    },

    SendButton: {
        height: 80,
        width: 300,
        marginTop: 25,
        backgroundColor: '#0066FF',
        borderRadius: 14,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        zIndex: 9999,
        elevation: 9999,
    },

    SendText: {
        fontSize: 50,
        color: 'white',
    },
});

export default ContactUs;
