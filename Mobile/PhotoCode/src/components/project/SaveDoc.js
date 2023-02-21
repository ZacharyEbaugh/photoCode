import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { View, ScrollView, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import HomeScreen from './../user_initialization/HomeScreen';
import SaveDestination from './SaveDestination';

import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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

    const [commitTitle, setCommitTitle] = useState("");
    const [commitMessage, setCommitMessage] = useState("");

    const [commitTitlePlaceholder, setCommitTitlePlaceholder] = useState();
    const [commitMessagePlaceholder, setCommitMessagePlaceholder] = useState("Commit from " + props.user.name);

    const [numProjects, setNumProjects] = useState(0);

    const [folderDestination, setFolderDestination] = useState('');
    const [projectDestination, setProjectDestination] = useState('');

    const {filename, fileId, editorOrigin, textToSave, projectId} = route.params;

    useEffect(() => {
        // if (filename == '' || fileId == undefined || textToSave == undefined)
        //     setDisabled(true)
        // const fileId = route.params.fileId;
        // console.warn(fileId);
        setCommitTitlePlaceholder("Update " + filename)
    }, [])

    function updateCommitTitle(text) {
        setCommitTitle(text);
    }
    
    function updateCommitMessage(text) {
        setCommitMessage(text);
    }

    async function updateFileContents(fileId, code, screenName, projectId, projectName) {
        const user_id = AsyncStorage.getItem('user_id');
        const user_picture = await AsyncStorage.getItem('user_picture');

        console.log(fileId);
        console.log(code);

        if (fileId != undefined && code != undefined) {
            const response = await axios.post(baseUrl + `/updateFile`, {
                file_id: fileId,
                file_contents: code,
            }).then(async res => {
                const commitResponse = await axios.post(baseUrl + `/createCommit`, {
                    project_id: (projectId == undefined) ? projectDestination : projectId,
                    user_id: user_id,
                    picture: user_picture.split('"')[1],
                    title: commitTitle === '' ? commitTitlePlaceholder : commitTitle,
                    message: commitMessage === '' ? commitMessagePlaceholder : commitMessage,
                })
                navigation.navigate(screenName, { projectId, projectName })
            });
        } else {
            addFile(code, screenName, projectId, projectName);
        }
    }

    async function addFile(code, screenName, projectId, projectName) {
        if (folderDestination == '' || folderDestination == undefined) {
            Alert.alert("Please select a folder to save to");
            console.warn(code);
            return;
        }
        // Handle generating unique file object name
        const fileName = filename + ':::::' + folderDestination + ':::::' + projectDestination;
        // Create a blank file to upload to gridfs
        const file = new File([""], fileName, {type: "text/plain"});
        // Create a form data object to send to the server
        const formData = new FormData();
        formData.append('files', file);
        console.warn(formData);
        // Axios call to upload file to gridfs
        await axios.post('https://photocode.app:8443/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            // Update the folders state variable
            const fileId = res.data.file_id;
            updateFileContents(fileId, code, 'HomeScreen', projectId, projectName)
        });
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
            <ScrollView 
                style={styles.main}
                contentContainerStyle={
                    {
                        flex: 1,
                        height: windowHeight * 1,
                        paddingBottom: (editorOrigin == 1) ? windowHeight + windowHeight * 0.05 * numProjects : 0,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }
                }>
                <View style={styles.inputBox}>
                    {editorOrigin == 1 ? 
                        <View style={styles.titleHeader}>
                            <Text style={styles.subjectTitle}>Save Destination</Text>
                            <View style={styles.underLine}></View>
                            <SaveDestination setProjectDestination={setProjectDestination} setFolderDestination={setFolderDestination} setNumProjects={setNumProjects} user_id={props.user_id}/>
                        </View>
                    : null}
                    <View style={styles.titleHeader}>
                        <Text style={styles.subjectTitle}>Commit Title</Text>
                        <View style={styles.underLine}></View>
                        <TextInput 
                            style={styles.SubjectInput} 
                            placeholder={commitTitlePlaceholder}
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
                            placeholder={commitMessagePlaceholder}
                            onChangeText={(text) => {updateCommitMessage(text)}}
                        ></TextInput>
                    </View>
                    {projectId == undefined ? 
                        <UpdateButton isDisabled={disabled} screenName={'HomeScreen'} /> 
                        : 
                        <UpdateButton isDisabled={disabled} screenName={'ProjectPage'} />
                    } 
                </View>
            </ScrollView>
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    header: {
        backgroundColor: '#0066FF',
        // flex: 1,
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
        marginBottom: windowHeight * 0.01,
        fontFamily: 'JetBrainsMono-Medium',
    },

    main: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // flex: 5,
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
        justifyContent: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        paddingTop: 10,
    },

    subjectTitle: {
        fontSize: 30,
        // padding: 5,
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontFamily: 'JetBrainsMono-Medium',

    },

    subjectTitleDest: {
        fontSize: 25,
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

    underLineDest: {
        width: windowWidth * 0.82,
        borderWidth: 1,
        borderColor: 'black',
        // marginBottom: windowHeight * 0.02,
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
        // height: windowHeight * 0.45,
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
        height: windowHeight * 0.3,
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
        marginBottom: 2000,
    },

    SendText: {
        fontSize: 50,
        color: 'white',
        fontFamily: 'JetBrainsMono-Medium',
    },
    opacity: {
        opacity: 0.5
    },

});

export default SaveDoc;
