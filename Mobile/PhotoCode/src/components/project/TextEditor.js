import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Buffer } from 'buffer';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'

import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

import HomeScreen from './../user_initialization/HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const languages = ["HTML", "CSS", "JavaScript", "Python", "React", "Java"];

var updatedText = "";

var selectedLanguage = '';

function NewDocumentOrigin ({language}) {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();

    const route = useRoute();
    const { initialText } = route.params;


    return (
        <SafeAreaView style={styles.codeEditorBox}>
            <CodeEditor
                style={{
                    ...{
                        fontSize: 20,
                        inputLineHeight: 26,
                        highlighterLineHeight: 26,
                        height: windowHeight * 0.75,
                        width: windowWidth,
                        marginTop: windowHeight * -0.06,
                    },
                    ...(keyboard.keyboardShown
                        ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                        : {}),
                }}
                language={language}
                syntaxStyle={CodeEditorSyntaxStyles.vs2015}
                showLineNumbers
                initialValue={initialText}
                onChange={(text) => {updateText(text)}}
            />
        </SafeAreaView>
    );
};

function updateText(text) {
    updatedText = text;
}

function getText() {
    return updatedText;
}

function ProjectFileOrigin({language}) {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();

    const route = useRoute();
    const { fileId } = route.params;

    const [loading, setLoading] = useState(true)

    const [code, setCode] = useState('Hello World!');
    const [originCode, setOriginCode] = useState('Hello World!');
    

    const getFileContents = async() => {
        const response = await axios.get(`https://photocode.app:8443/getFile?file_id=${fileId}`);
        const buffer = Buffer.from(response.data.fileContents.data, 'hex')
        await setCode(buffer.toString());
        await setOriginCode(buffer.toString());
        setLoading(false);
    }
    getFileContents()


    return (
        <SafeAreaView style={styles.codeEditorBox}>
            {loading == true ? <Text>{'Loading'}</Text> : <CodeEditor
                style={{
                    ...{
                        fontSize: 20,
                        inputLineHeight: 26,
                        highlighterLineHeight: 26,
                        height: windowHeight * 0.75,
                        width: windowWidth,
                        marginTop: windowHeight * -0.06,
                    },
                    ...(keyboard.keyboardShown
                        ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                        : {}),
                }}
                language={language}
                syntaxStyle={CodeEditorSyntaxStyles.vs2015}
                showLineNumbers
                initialValue={code}
                onChange={(text) => {updateText(text)}}
            />}
        </SafeAreaView>
    );
}

function BackButton({ screenName, fileName }) {
    const navigation = useNavigation();
    const route = useRoute();

    const { fileId, editorOrigin, projectId, projectName} = route.params;

    function saveDocument() {
        if (fileName == '' && getText() == '') {
            Alert.alert("Must Set a Filename and Add Text to File");
        } else if (fileName == ''){
            Alert.alert("Must Set a Filename");
        } else if (getText() == '') {
            Alert.alert("Must Add Text to File");
        } else {
            navigation.navigate('SaveDoc', {
                filename: fileName,
                fileId: fileId,
                editorOrigin: editorOrigin,
                textToSave: getText(),
            });
        }
    }

    return (
        <Pressable
            onPress={() => Alert.alert(
                "Leave without saving?",
                "",
                [
                    {
                        text: 'Save',
                        onPress: () => {saveDocument()}
                    },
                    {
                        text: 'Leave',
                        onPress: () => navigation.navigate(screenName, { projectId, projectName })
                    },
                    {
                        text: 'Cancel',
                    },
                ],
            )
            }
        >
            <Text style={styles.backText}>
                {'< Back'}
            </Text>
        </Pressable>

    );
}

function SaveButton({ fileName }) {
    const navigation = useNavigation();
    const route = useRoute();

    const { fileId, editorOrigin, projectId, projectName} = route.params;

    function saveDocument() {
        if (fileName == '' && getText() == '') {
            Alert.alert("Must Set a Filename and Add Text to File");
        } else if (fileName == ''){
            Alert.alert("Must Set a Filename");
        } else if (getText() == '') {
            Alert.alert("Must Add Text to File");
        } else {
            navigation.navigate('SaveDoc', {
                filename: fileName,
                fileId: fileId,
                editorOrigin: editorOrigin,
                textToSave: getText(),
                projectId: projectId,
                projectName: projectName,
            });
        }
    }

    return (
        <Pressable style={styles.SendButton}
            onPress={() => {saveDocument()}}
        >
            <Text style={styles.SendText}>
                Save
            </Text>

        </Pressable>

    );
}


function TextEditor(props) {
    const route = useRoute();

    // Possible Origins: camera/new document (1), project file (2)
    const { editorOrigin, originFilename } = route.params;

    var [fileName, setFileName] = useState("");
    
    useEffect(() => {
        if (originFilename != undefined)
            setFileName(originFilename)
        else
            fileName = '';
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    {editorOrigin == 1 ? <BackButton screenName={'HomeScreen'} fileName={fileName} /> : <BackButton screenName={'ProjectPage'} fileName={fileName} />}
                </View>
                <View style={styles.titleAndLanguage}>
                    <View style={styles.title}>
                        {/* <Text style={styles.title}>Contact Us</Text> */}
                        {/* <TitleInput title={docTitle}/> */}
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Title.txt"
                            onChangeText={(newName) => setFileName(newName)}
                            defaultValue={fileName}
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.languageChoice}>
                        <SelectDropdown
                            data={languages}
                            dropdownStyle={styles.dropDown}
                            buttonStyle={styles.dropDownButton}
                            defaultButtonText="Language"
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                selectedLanguage = languages[index]
                                // console.warn(selectedLanguage)
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>

                </View>
            </View>

            <View style={styles.main}>
                {editorOrigin == 1 ? <NewDocumentOrigin language={selectedLanguage}/> : <ProjectFileOrigin language={selectedLanguage}/>}
              
                <SaveButton fileName={fileName} user={props.user} />
             
               
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

    titleAndLanguage: {
        flexDirection: 'row',
        // backgroundColor: 'black',
        // justifyContent: 'space-between'
    },

    languageChoice: {
        width: windowWidth * 0.3,
        height: '100%',
        // backgroundColor: 'black',
        position: 'absolute',
        right: windowWidth * 0.05,
        color: 'black',

    },

    dropDown: {
        // backgroundColor: 'black',
        // color: 'black',
    },

    dropDownButton: {
        borderRadius: 15,
        width: windowWidth * 0.3,
        fontFamily: 'JetBrainsMono-Medium',
    },

    title: {
        fontSize: 40,
        // marginTop: -100,
        textAlign: 'left',
        marginLeft: windowWidth * 0.02,
        width: windowWidth,
        color: '#FFFFFF',
                fontFamily: 'JetBrainsMono-Medium',
    },

    titleInput: {
        fontSize: 35,
        width: windowWidth * 0.6,
        marginLeft: windowWidth * 0.02,
        color: 'white',
        fontFamily: 'JetBrainsMono-Medium',
        
    },

    main: {
        backgroundColor: '#FFFFFF',
        height: windowHeight * 0.84,
        // flex: 5,
    },

    codeEditorBox: {
        height: '100%',
    },

    SendButton: {
        height: windowHeight * 0.12,
        width: windowWidth * 1.02,
        alignSelf: 'center',
        backgroundColor: '#0066FF',
        marginTop: -windowHeight * 0.11,
    },

    SendText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginTop: '5%',
        fontFamily: 'JetBrainsMono-Medium',
    }


});

export default TextEditor;
