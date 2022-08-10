import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'

import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

import HomeScreen from './HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const languages = ["HTML", "CSS", "JavaScript", "Python", "React", "Java"];

var selectedLanguage = '';

function Example ({language}) {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();

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
            />
        </SafeAreaView>
    );
};

function BackButton({ screenName, fileName }) {
    const navigation = useNavigation();

    if (fileName != '')
    {
        return (
            <Pressable
                // title={`Go to ${screenName}`}
                onPress={() => Alert.alert(
                    "Leave without saving?",
                    "",
                    [
                        {
                            text: 'Save',
                            onPress: () => [navigation.navigate('SaveDoc', {
                                fileName: fileName
                            })]
                        },
                        {
                            text: 'Leave',
                            onPress: () => navigation.navigate('HomeScreen')
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

    else
    {
        return (
            <Pressable
                onPress={() => Alert.alert(
                    "Leave without saving?",
                    "",
                    [
                        {
                            text: 'Save',
                            onPress: () => Alert.alert("Please set a name for the file!"),
                        },
                        {
                            text: 'Leave',
                            onPress: () => navigation.navigate('HomeScreen')
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
}

function SendButton({ screenName, fileName }) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.SendButton}
            onPress={() =>
                [navigation.navigate('SaveDoc', {
                    fileName: fileName
                })]
            }>
            <Text style={styles.SendText}>
                Save
            </Text>

        </Pressable>

    );
}


function TextEditor() {
    var fileName = '';
    
    const route = useRoute();

    if (route.params.fileName == '')
        fileName = route.params.fileName;
    else
        fileName = '';

    var [fileName, setFileName] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <BackButton screenName={HomeScreen} fileName={fileName} />
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
                <Example language={selectedLanguage}/>
              
                <SendButton screenName={'SaveDoc'} fileName={fileName} />
             
               
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
        width: windowWidth * 0.3
    },

    title: {
        fontSize: 40,
        // marginTop: -100,
        textAlign: 'left',
        marginLeft: windowWidth * 0.02,
        width: windowWidth,
        color: '#FFFFFF',
        // fontFamily: 'JetBrainsMono-Regular',
    },

    titleInput: {
        fontSize: 40,
        width: windowWidth * 0.6,
        marginLeft: windowWidth * 0.02,
        color: 'white',
        
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
        marginTop: -windowHeight * 0.1,
    },

    SendText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginTop: '5%',
    }


});

export default TextEditor;
