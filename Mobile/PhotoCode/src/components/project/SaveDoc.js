import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import HomeScreen from './../user_initialization/HomeScreen';

import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var fileName = '';


var updateFile = "Update " + fileName;

var userName = "Zachary Ebaugh";

function GoToButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable
            // title={`Go to ${screenName}`}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backText}>
                {'< Back'}
            </Text>
        </Pressable>

    );
};

function TitleText() {
    const route = useRoute();
    if (route.params.fileName != '')
        fileName = route.params.fileName;
    else
        fileName = 'No File';

    return (
        <Text style={styles.title}>{fileName}</Text>
    );
}


function UpdateButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SendButton}
            onPress={() =>
                [navigation.navigate(screenName)]}
        >
            <Text style={styles.SendText}>
                Update
            </Text>

        </Pressable>

    );
}

class SaveDoc extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName={HomeScreen} />
                    </View>
                    <View style={styles.titleBox}>
                        <TitleText/>
                        <Text style={styles.subTitle}>changes made</Text>

                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.inputBox}>
                        
                        <View style={styles.titleHeader}>
                            <Text style={styles.subjectTitle}>Title</Text>
                            <View style={styles.underLine}></View>
                            <TextInput style={styles.SubjectInput} placeholder={updateFile}></TextInput>
                        </View>
                       
                       
                        <View style={styles.Message}>
                            <Text style={styles.subjectTitle}>Description</Text>
                            <View style={styles.underLine}></View>
                            <TextInput
                                style={styles.MessageInput}
                                multiline={true}
                                numberOfLines={'auto'}
                                placeholder={"Commit from " + userName}
                            ></TextInput>
                        </View>
                        <UpdateButton screenName={HomeScreen} />
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
        fontFamily: 'JetBrainsMono-Medium',
    },

    titleBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight * 0.085,
    },

    title: {
        fontSize: 40,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Bold',
    },

    subTitle: {
        fontSize: 25,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        marginTop: windowHeight * -0.006,
        fontFamily: 'JetBrainsMono-Medium',
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

    titleHeader: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.18,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'black'
        fontFamily: 'JetBrainsMono-Medium',
    },

    subjectTitle: {
        fontSize: 35,
        // padding: 5,
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontFamily: 'JetBrainsMono-Medium',
    },

    underLine: {
        width: windowWidth * 0.82,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: windowHeight * 0.02,
        alignSelf: 'center'
    },

    SubjectInput: {
        // flex: 1,
        width: windowWidth * 0.8,
        height: windowHeight * 0.06,
        fontSize: 25,
        padding: 10,
        // marginLeft: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: windowHeight * 0.011,
        alignSelf: 'center',
        fontFamily: 'JetBrainsMono-Regular',
    },

    Message: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.45,
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: windowHeight * 0.015,
        // borderWidth: 2,
        // borderColor: 'black',
        marginTop: windowHeight * 0.01,
    },

    MessageInput: {
        color: 'black',
        fontSize: 25,
        width: windowWidth * 0.8,
        height: windowHeight * 0.4,
        borderRadius: windowHeight * 0.015,
        padding: 10,
        paddingTop: 10,
        borderWidth: 2,
        borderColor: 'black',
        fontFamily: 'JetBrainsMono-Regular',
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
        fontFamily: 'JetBrainsMono-Medium',
    },
});

export default SaveDoc;
