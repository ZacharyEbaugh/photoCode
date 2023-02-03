import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { 
    View,
    ScrollView,
    Animated,
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
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const newFolderIcon = require('./../../assets/images/newFolder.png');
const newFileIcon = require('./../../assets/images/newFile.png');
const xIcon = require('./../../assets/images/x.png');
const deleteIcon = require('./../../assets/images/deleteFile.png');
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

function GoToSourceControl(props) {
    const navigation = useNavigation();
    return (
        <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('SourceControl', { commits: props.commits})}
        >
            <Text style={styles.actionButtonText}>
                Version Control
            </Text>
        </Pressable>
    );
}

function GoToProjectSettings() {
    const route = useRoute();
    const { projectName, projectDescription, projectId } = route.params;
    const navigation = useNavigation();
    return (
        <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProjectSettings')}>
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

var maxNameSize = 25;

var loadingProgress = new Animated.Value(0);

function ProjectPage(props) {

    const [project_id, setProject_Id] = useState('');
    const [currentFolders, setCurrentFolders] = useState([])
    const [currentPath, setCurrentPath] = useState([])
    const [folderSet, setFolderSet] = useState(false)
    const [currentFiles, setCurrentFiles] = useState([])
    const [filesFound, setFilesFound] = useState(false)
    const [commits, setCommits] = useState(null)
    const [newFolder, setNewFolder] = useState(false)
    const [newFile, setNewFile] = useState(false)

    const [loading, setLoading] = useState(true)

    state = {
        newFolderName: String, 
        newFileName: String,
    }

    const route = useRoute();
    // const { projectId, projectName, projectDescription, projectCollaborators } = route.params;

    animateLoadingProgress = () => {
        Animated.timing(loadingProgress, {
            toValue: 10,
            duration: 1500,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            setLoading(false)
            Animated.timing(loadingProgress, {
                toValue: 0,
                duration: 1,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start()
        })
    }   
    function getProjectFiles(projectId) {
        var response = axios.get(baseUrl + `/getFolders?project_id=${projectId}`).then(res => {
           root_folder = res.data;
           root_folder_id = (res.data[0]._id != undefined) ? res.data[0]._id : null;
           res.data[0].name = 'root'
           setCurrentPath([...currentPath, res.data[0]])
           if (root_folder_id != null) {
            axios.get(baseUrl + `/getFolders?project_id=${root_folder_id}`).then( async res => {
                setCurrentFolders(res.data)
                animateLoadingProgress()
            })
           }
        });
    }

    async function getCommits(projectId) {  
        var response = await axios.post(baseUrl + `/getAllCommits`, {
            project_id: projectId,
        }).then(async res => {
            await setCommits(res.data.reverse())
        });
    };

    useEffect(() => {
        _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('project_id');
                if (value !== null) {
                // We have data!!
                    await setProject_Id(value);
                    await getCommits(value);
                    getProjectFiles(value);
                }
            } catch (error) {
                // Error retrieving data
                console.warn(error);
            }
        };
        _retrieveData();
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

    function NewFolderInput() {
        return (
            <View style={styles.newNameWrapper}>
                <TextInput
                    style={styles.newNameInput}
                    placeholder='New Folder'
                    placeholderTextColor='darkgrey'
                    autoCapitalize='none'
                    onChangeText={(text) => {this.state.newFolderName = text}} 
                    onSubmitEditing={() => {console.log(this.state.newFolderName); setNewFolder(false); uploadFolder()}}
                    maxLength={maxNameSize}
                />
                <Pressable
                    onPress={() => {setNewFolder(false); this.state.newFolderName = ""}}
                >
                   <Image style={styles.fileImage} source={xIcon} />
                </Pressable>
            </View>
        )
    }

    function DisplayFolders() {
        return (
            <View>
            {currentFolders.map((folder, i) => (
                <View key={i}>
                    <View style={styles.greyLine} />
                    <View style={styles.fileLineWrapper}>
                        <Pressable
                            style={styles.fileLine}
                            onPress={() => {updateFolders(folder)}}
                        >
                            <Image style={styles.fileImage} source={blueFolder} />
                            <Text style={styles.fileText}>{folder.name}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.deleteFileIconWrapper}
                            onPress={() => {deleteFolder(folder)}}
                        >
                            <Image style={styles.deleteFileIcon} source={deleteIcon} />
                        </Pressable>
                    </View>
                </View>
            ))}
            {newFolder == true ? <NewFolderInput /> : null}
            </View>
        );
    }

    function NewFileInput() {
        return (
            <View style={styles.newNameWrapper}>
                <TextInput
                    style={styles.newNameInput}
                    placeholder='New File'
                    placeholderTextColor='darkgrey'
                    autoCapitalize='none'
                    onChangeText={(text) => {this.state.newFileName = text}} 
                    onSubmitEditing={() => {console.log(this.state.newFileName); setNewFile(false); uploadFile()}}
                    maxLength={maxNameSize}
                />
                <Pressable
                    onPress={() => {setNewFile(false); this.state.newFileName = ""}}
                >
                   <Image style={styles.fileImage} source={xIcon} />
                </Pressable>
            </View>
        )
    }

    function DisplayFiles() {
        const navigation = useNavigation();
        const rout = useRoute();

        const { projectId, projectName } = route.params;
         
        return (
            <View>
                {currentFiles.map((file, i) => (
                    <View key={i}>
                        <View style={styles.greyLine} />
                        <Pressable
                            style={styles.fileLine}
                            onPress={() => {navigation.navigate('TextEditor', {
                                user: props.user,
                                originFilename: file.filename, 
                                fileId: file._id, 
                                editorOrigin: 2, 
                                projectId: projectId,
                                projectName: projectName,
                            })}}
                        >
                            
                            <Image style={styles.fileImage} source={fileIcon} />
                            <Text style={styles.fileText}>{file.filename}</Text>
                        </Pressable>
                    </View>
                ))}
                {newFile == true ? <NewFileInput /> : null}
            </View>
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

    async function uploadFolder() {
        var parent_folder = currentPath[currentPath.length - 1]._id;

        var response = await axios.post(baseUrl + '/createFolder', {
            name: this.state.newFolderName,
            parent_id: parent_folder,
        });
        await axios.get(baseUrl + `/getFolders?project_id=${parent_folder}`).then( async res => {
            setCurrentFolders(res.data)
        })
    }

    async function deleteFolder(folder) {
        var folder_id = folder._id;
        var parent_folder = currentPath[currentPath.length - 1]._id;

        var response = await axios.post(baseUrl + '/deleteFolder', {
            folder_id: folder_id,
        })
        await axios.get(baseUrl + `/getFolders?project_id=${parent_folder}`).then( async res => {
            setCurrentFolders(res.data)
        })

    }

    async function uploadFile() {
        var parent_folder = currentPath[currentPath.length - 1]._id;
        console.log(currentPath[currentPath.length - 1])

        var fileName = this.state.newFileName + ':::::' + parent_folder;

        const file = new File([""], fileName, {type: "text/plain"});

        const formData = new FormData();
        formData.append('files', file);
        

        var response = await axios.post(baseUrl + '/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }).then(async res => {
            var folders = await axios.get(baseUrl + `/getFolders?project_id=${parent_folder}`)
            var files = await axios.get(baseUrl + `/getFiles?project_id=${parent_folder}`)
            setCurrentFolders(folders.data)
            if (files != undefined) {
                setCurrentFiles(files.data)
                setFilesFound(true)
            } else {
                setFilesFound(false)
            }
        })
        
    }

    const loadingColor = loadingProgress.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '100%']
    })

    return (
        loading == true ? (<View style={styles.loadingWrapper}><Text style={styles.loadingText}>{'Loading'}</Text><View style={styles.loadingBarWrapper}><Animated.View style={[styles.loadingBar, {width: loadingColor}]}/></View></View>) :
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
                        <Pressable style={styles.createImageWrapper} onPress={() => {setNewFolder(true)}}>
                            <Image style={styles.createIcon} source={newFolderIcon} />
                        </Pressable>

                        <Pressable style={styles.createImageWrapper} onPress={() => {setNewFile(true)}}>
                            <Image style={styles.createIcon} source={newFileIcon} />
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
                    {commits != null ? <GoToSourceControl commits={commits}/> : null}
                    <GoToProjectSettings setIsLoading={props.setIsLoading}/>
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
        fontSize: 20,
        fontFamily: 'JetBrainsMono-Medium',
    },
    loadingBarWrapper: {
        width: windowWidth/2,
        marginTop: 15,
        borderWidth: 3,
        height: 10,
        borderColor: 'black',
        borderRadius: 10,
    },
    loadingBar: { 
        height: 4,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#0066FF',
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#0066FF',
        // flex: 1.5,
        height: windowHeight*0.2,
        // paddingTop: windowHeight*0.05,
        // justifyContent: 'center',
        // flexDirection: 'row',
        // alignItems: 'center',
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
        marginTop: 25,
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
    fileLineWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // width: windowWidth,
        marginVertical: 5,
        // borderWidth: 2,
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
        fontSize: 18,
        flex: 0.85,
        // flexWrap: 'wrap',
        // flexShrink: ,
    },
    newNameWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    newNameInput: {
        fontFamily: 'JetBrainsMono-Light',
        fontSize: 20,
    },
    deleteFileIconWrapper: {
        borderColor: '#d8d8d8',
        borderWidth: 3,
        borderRadius: 5,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
        // border: 3px solid #d8d8d8;
    },
    deleteFileIcon: {
        width: windowWidth * 0.075,
        height: windowHeight * 0.0375,
    }
});

export default ProjectPage;
