import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import HomeScreen from './../user_initialization/HomeScreen';

import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// API Setup
baseUrl = `https://photocode.app:8443`;

function GoToButton({ screenName }) {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backText}>
                {'< Back'}
            </Text>
        </Pressable>

    );
};





function SaveDoc(props) {
    const navigation = useNavigation()
    const route = useRoute();
    const [disabled, setDisabled] = useState(false);
    const [updateFile, setUpdateFile] = useState("Update");

    const [commitTitle, setCommitTitle] = useState("");
    const [commitMessage, setCommitMessage] = useState("");

    const {filename, fileId, textToSave, projectId} = route.params;

    useEffect(() => {
        if (filename == '' || fileId == undefined || textToSave == undefined)
            setDisabled(true)
        setUpdateFile("Update " + filename)
    }, [])

    function updateCommitTitle(text) {
        setCommitTitle(text);
    }
    
    function updateCommitMessage(text) {
        setCommitMessage(text);
    }

    async function updateFileContents(fileId, code, screenName, projectId, projectName) {

        if (commitTitle == "" || commitMessage == "") {
            Alert.alert("Please add a title and description");
            return;
        }

        if (fileId != undefined && code != undefined) {
            const response = await axios.post(baseUrl + `/updateFile`, {
            file_id: fileId,
            file_contents: code
            }).then(async res => {
                const commitResponse = await axios.post(baseUrl + `/createCommit`, {
                    project_id: projectId,
                    user_id: props.user_id,
                    picture: props.user.picture,
                    title: commitTitle,
                    message: commitMessage,
                })
                navigation.navigate(screenName, { projectId, projectName })
            });
        } else {
            Alert.alert("Could not update file");
        }
    }

    function UpdateButton({ isDisabled, screenName }) {
        const { fileId, textToSave, editorOrigin, projectId, projectName } = route.params;
    
        return (
            <Pressable style={styles.SendButton}
                onPress={async () =>
                    {await updateFileContents(fileId, textToSave, screenName, projectId, projectName); }}
                disabled={isDisabled}
            >
                <Text style={[styles.SendText, isDisabled && styles.opacity]}>
                    Update
                </Text>
    
            </Pressable>
    
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <GoToButton screenName={HomeScreen} />
                </View>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{filename}</Text>
                    <Text style={styles.subTitle}>changes made</Text>

                </View>
            </View>

            <View style={styles.main}>
                <View style={styles.inputBox}>
                    
                    <View style={styles.titleHeader}>
                        <Text style={styles.subjectTitle}>Commit Title</Text>
                        <View style={styles.underLine}></View>
                        <TextInput 
                            style={styles.SubjectInput} 
                            placeholder={updateFile}
                            onChangeText={(text) => {updateCommitTitle(text)}}
                        />
                    </View>
                    
                    
                    <View style={styles.Message}>
                        <Text style={styles.subjectTitle}>Description</Text>
                        <View style={styles.underLine}></View>
                        <TextInput
                            style={styles.MessageInput}
                            multiline={true}
                            numberOfLines={'auto'}
                            placeholder={"Commit from " + props.user.name}
                            onChangeText={(text) => {updateCommitMessage(text)}}
                        ></TextInput>
                    </View>
                    {projectId == undefined ? 
                        <UpdateButton isDisabled={disabled} screenName={'HomeScreen'} /> 
                        : 
                        <UpdateButton isDisabled={disabled} screenName={'ProjectPage'} />
                    } 
                </View>
            </View>
        </View>
    );
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
    opacity: {
        opacity: 0.5
    }
});

export default SaveDoc;
