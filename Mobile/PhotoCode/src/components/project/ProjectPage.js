import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { 
    View,
    ScrollView,
    Pressable, 
    Text,
    Image, 
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Alert
} from 'react-native';

import { BaseRouter, useNavigation, useRoute } from '@react-navigation/native';
import { height } from '@mui/system';
import { BackButton } from './../BackButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const newFolder = require('./../../assets/images/newFolder.png');
const newFile = require('./../../assets/images/newFile.png');
const blueFolder = require('./../../assets/images/blueFolder.png');
const fileIcon = require('./../../assets/images/file.png');
const goBackFolderIcon = require('./../../assets/images/backFolder.png');

function GoBackButton() {
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
}

function GoToSourceControl() {
    const navigation = useNavigation();
    return (
        <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('SourceControl')}
        >
            <Text style={styles.actionButtonText}>
                Version Control
            </Text>
        </Pressable>
    );
}

function GoToProjectSettings() {
    const route = useRoute();
    const { projectName } = route.params;
    const navigation = useNavigation();
    return (
        <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProjectSettings', {projectName: projectName})}>
            <Text style={styles.actionButtonText}>
                Project Settings
            </Text>
        </Pressable>
    );
}

function GetProjectName() {
    const route = useRoute();
    const { projectName } = route.params;

    return (
        <Text style={styles.title}>
            {projectName}
        </Text>
    );
}


var root_folder_id;
var root_folder;


// API Setup
baseUrl = 'https://photocode.app:8443';


function ProjectPage() {

    const [currentFolders, setCurrentFolders] = useState([])
    const [currentPath, setCurrentPath] = useState([])
    const [folderSet, setFolderSet] = useState(false)
    const [currentFiles, setCurrentFiles] = useState([])
    const [filesFound, setFilesFound] = useState(false)

    const [loading, setLoading] = useState(true)

    const route = useRoute();
    const { projectId } = route.params;
    
    function getProjectFiles(projectId) {
        var response = axios.get(baseUrl + `/getFolders?project_id=${projectId}`).then(res => {
            root_folder = res.data;
           root_folder_id = (res.data[0]._id != undefined) ? res.data[0]._id : null;
           res.data[0].name = 'root'
           setCurrentPath([...currentPath, res.data[0]])
        //    console.warn(root_folder_id);
        //    console.warn(root_folder[0].name)
           if (root_folder_id != null) {
            axios.get(baseUrl + `/getFolders?project_id=${root_folder_id}`).then( async res => {
                // console.warn(res.data[0])
                setCurrentFolders(res.data)
                // console.warn(currentFolders)

                await new Promise((resolve) => setTimeout(resolve, 1000));
                setLoading(false)
            })
           }
            // axios.get(`https://photocode.app:8443/getFiles?project_id=${folder._id}`);
        });
        // console.warn(response.data);
    }


    useEffect(() => {
        getProjectFiles(projectId);
    }, [])

    async function updateFolders(folder) {
        // console.warn(folder.name)
        var folders = await axios.get(baseUrl + `/getFolders?project_id=${folder._id}`)
        var files = await axios.get(baseUrl + `/getFiles?project_id=${folder._id}`)
        setCurrentFolders(folders.data)
        if (files != undefined) {
            setCurrentFiles(files.data)
            setFilesFound(true)
        } else {
            setFilesFound(false)
        }

        setCurrentPath([...currentPath, folder])
    }

    function DisplayFolders() {
        return (
            currentFolders.map((folder, i) => (
                <View key={i}>
                    <View style={styles.greyLine} />
                    <Pressable
                        style={styles.fileLine}
                        onPress={() => {updateFolders(folder)}}
                    >
                        <Image style={styles.fileImage} source={blueFolder} />
                        <Text style={styles.fileText}>{folder.name}</Text>
                    </Pressable>
                </View>
            ))
        );
    }

    function DisplayFiles() {
        return (
            currentFiles.map((file, i) => (
                <View key={i}>
                    <View style={styles.greyLine} />
                    <Pressable
                        style={styles.fileLine}
                        onPress={() => {}}
                    >
                        
                        <Image style={styles.fileImage} source={fileIcon} />
                        <Text style={styles.fileText}>{file.filename}</Text>
                    </Pressable>
                </View>
            ))
        );
    }

    async function goBackFolder() {
        folder = currentPath[currentPath.length - 1];
        if (folder.name == 'root'){
            Alert.alert("Cannot return from root");
            return; 
        }

        var folders = await axios.get(baseUrl + `/getFolders?project_id=${folder.parent_folder}`)
        var files = await axios.get(baseUrl + `/getFiles?project_id=${folder.parent_folder}`)
        // console.warn(folders.data)
        setCurrentFolders(folders.data)
        if (files != undefined) {
            setCurrentFiles(files.data)
            setFilesFound(true)
        } else {
            setFilesFound(false)
        }

        setCurrentPath(currentPath.slice(0, currentPath.length - 1));
    }

    return (
        loading == true ? (<View style={styles.loadingWrapper}><Text style={styles.loadingText}>{'Loading'}</Text></View>) :
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <View>
                    <GetProjectName />
                </View>
            </View>

            <View style={styles.main}>
                <View style={styles.searchCreateWrapper}>
                    <View style={styles.createButton}>
                        <Pressable style={styles.createImageWrapper}>
                            <Image style={styles.createIcon} source={newFolder} />
                        </Pressable>

                        <Pressable style={styles.createImageWrapper}>
                            <Image style={styles.createIcon} source={newFile} />
                        </Pressable>
                    </View>

                    <View style={styles.searchArea}>
                        <Pressable onPress={() => {}} >
                            <Image style={styles.searchImage} source={require('./../../assets/images/search.png')} />
                        </Pressable>
                        <TextInput
                            style={styles.search}
                            placeholder='Search Files'
                            placeholderTextColor='#5A5A5A' 
                        />
                    </View>
                </View>

                <View style={styles.directoryPath}>
                    <Pressable 
                        style={styles.goBackFolderWrapper}
                        onPress={() => {goBackFolder()}}
                    >
                        <Image style={styles.goBackFolderIcon} source={goBackFolderIcon} />
                    </Pressable>
                    {currentPath.map((folder, i) => (
                        <Text key={i} style={styles.directoryPathText}>{folder.name + '/'}</Text>
                    ))}
                </View>

                <ScrollView style={styles.fileExplore}>
                    <DisplayFolders />
                    {filesFound ? <DisplayFiles /> : null}
                </ScrollView>
                
                <View style={styles.greyLine} />

                <View style={styles.buttonWrapper}>
                    <GoToSourceControl/>
                    <GoToProjectSettings/>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    loadingWrapper: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontFamily: 'JetBrainsMono-Medium',
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#0066FF',
        flex: 1.5,
        justifyContent: 'space-evenly',
    },
    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
        justifyContent: 'space-between',
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
    title: {
        fontSize: 35,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
    projectBlock: {
        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginVertical: 10,
    },
    projectContent: {
        flexDirection: 'row',
    },
    projectImage: {
        marginVertical: 10,
        marginHorizontal: 15,
        height: 75,
        width: 75,
        resizeMode: 'contain',
    },
    textBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectText: {
        fontSize: 30,
    },
    infoBlock: {
        marginVertical: 10,
    },
    commonLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 1,
    },
    languageCircle: {
         width: 10,
         height: 10,
         borderRadius: 10 / 2,
         marginHorizontal: 5,
    },
    languageOneColor: {
         backgroundColor: '#FF5C00',
    },
    languageTwoColor: {
         backgroundColor: '#00D1FF',
    },
    languageThreeColor: {
         backgroundColor: '#FFE600',
    },
    date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1,
    },
    searchCreateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    searchArea: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        borderRadius: 5,
        width: windowWidth * 0.65,
        alignSelf: 'center',
    },
    search: {
        width: windowWidth * 0.75,
        height: windowHeight * 0.05,
        fontSize: 25,
        textAlign: 'left',
        paddingLeft: 10,
        fontFamily: 'JetBrainsMono-Light',
        color: 'black',

    },
    searchImage: {
        width: 28,
        height: 27,
        marginLeft: 10,
    },
    createButton: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: windowWidth * 0.26,
        height: windowHeight * 0.05,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 15,
    },
    createImageWrapper: {
        borderColor: '#d8d8d8',
        borderWidth: 3,
        borderRadius: 5,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
        // border: 3px solid #d8d8d8;
    },
    createIcon: {
        width: windowWidth * 0.08,
        height: windowHeight * 0.0375,
    },
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#0066FF',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        height: windowHeight * 0.08,
        width: windowWidth * 0.8,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
    },  
    actionButtonText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        color: 'white',
        fontSize: windowHeight * 0.035,
    },
    folder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    folderIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    file: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    line: {
        height: 2.5,
        width: windowWidth,
        backgroundColor: '#D8D8D8',
        marginBottom: 10,
    },
    fileName: {
        fontFamily: 'JetBrainsMono-Light',
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 5,
    },
    fileWrapper: {
        paddingLeft: 10,
    },
    goBackFolderWrapper: {
        marginRight: 10,
        // marginLeft: 5,
    },
    goBackFolderIcon: {
        width: windowWidth * 0.075,
        height: windowHeight * 0.0375,
    },
    directoryPath: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    directoryPathText: {
        fontFamily: 'JetBrainsMono-Light',
    },
    greyLine: {
        backgroundColor: '#808080',
        height: 1,
    },
    fileLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    fileImage: {
        width: windowWidth * 0.075,
        height: windowHeight * 0.0375,
        marginRight: 10,
    },
    fileText: {
        fontFamily: 'JetBrainsMono-Light',
        fontSize: 20,
    }
});

export default ProjectPage;
