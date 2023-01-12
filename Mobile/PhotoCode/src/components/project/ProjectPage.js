import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation, useRoute } from '@react-navigation/native';
import { height } from '@mui/system';
import { BackButton } from '../BackButton';

var PROJECT_FILES= [
    {
      folder: true,
      name: 'Fonts',
      imageFile: require('../../assets/images/folder_icon.png'),
    },
    {
        folder: true,
        name: 'Images',
        imageFile: require('../../assets/images/folder_icon.png'),
    },
    {
        folder: false,
        inFolder: 'Images',
        name: 'profile-pic.png',
        imageFile: require('../../assets/images/folder_icon.png'),
    },
    {
        folder: false,
        inFolder: 'Images',
        name: 'project-logo.png',
        imageFile: require('../../assets/images/folder_icon.png'),
    },
    {
        folder: false,
        name: 'index.css',
        imageFile: require('../../assets/images/cssIcon.png'),
    },
    {
        folder: false,
        name: 'index.html',
        imageFile: require('../../assets/images/html_Icon.png'),
    },
    {
        folder: false,
        name: 'README.md',
        imageFile: require('../../assets/images/readmeIcon.png'),
    },
  ];

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

class ProjectPage extends React.Component {

    // static propTypes = {
    //     projectName: PropTypes.string.isRequired,
    // };



    render () {
        return (
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
                            <Image style={styles.createIcon} source={require('../../assets/images/plus.png')} />
                        </View>

                        <View style={styles.searchArea}>
                            <Pressable onPress={() => {}} >
                                <Image style={styles.searchImage} source={require('../../assets/images/search.png')} />
                            </Pressable>
                            <TextInput
                                style={styles.search}
                                placeholderTextColor={'black'}
                                placeholder='Search Files'
                                placeholderTextColor='darkgrey' 
                            />
                        </View>
                    </View>

                    <View style={styles.fileExplore}>
                        {PROJECT_FILES.map((file, i) => (
                            file.folder ? 
                                <View key={i}>
                                    <Pressable style={styles.folder}>
                                        <Image 
                                            style={styles.folderIcon}
                                            source={file.imageFile}
                                        />
                                        <Text style={styles.fileName}>{file.name}</Text> 
                                    </Pressable>
                                    <View style={styles.line} />
                                </View>
                            : 
                                file.inFolder ? 
                                    <View key={i}>
                                        {/* <Pressable style={styles.file}>
                                            <Image 
                                                style={styles.folderIcon}
                                                source={file.imageFile}
                                            />
                                            <Text style={styles.fileName}>{file.name}</Text>
                                        </Pressable>
                                        <View style={styles.line} /> */}
                                    </View>
                                :
                                    <View key={i}>
                                        <Pressable style={styles.file}>
                                            <Image 
                                                style={styles.folderIcon}
                                                source={file.imageFile}
                                            />
                                            <Text style={styles.fileName}>{file.name}</Text>
                                        </Pressable>
                                        <View style={styles.line} />
                                    </View>

                        ))}
                    </View>

                    <View style={styles.buttonWrapper}>
                        <GoToSourceControl/>
                        <GoToProjectSettings/>
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
        // marginTop: -100,
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
        width: windowWidth * 0.75,
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
        backgroundColor: '#6DE959',
        borderRadius: 5,
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    createIcon: {
        width: windowWidth * 0.06,
        height: windowHeight * 0.025,
    },
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
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
    }
});

export default ProjectPage;
