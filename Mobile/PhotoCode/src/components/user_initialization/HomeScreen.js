import React, {useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {AsyncStorage} from '@react-native-community/async-storage';

import {    
    View, 
    Text,
    TouchableOpacity,
    TextInput,
    Animated, 
    Pressable, 
    Image, 
    Dimensions, 
    StyleSheet, 
    Easing, 
    ScrollView,
    Button} from 'react-native';

import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';

import Header from '../Header';
import SideBar from '../sidebar/SideBar';
import CreateProject from './CreateProject';
import { GoToProject } from '../project/GoToProject';
import GoToCamera from '../GoToCamera';
import CameraOptions from '../CameraOptions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// API Setup
const baseUrl = "https://photocode.app:8443";

// Animation Starting Values
cameraOptionsYPos = new Animated.Value(windowHeight);


function HomeScreen(props) {

    const [scrollY, setScrollY] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const [sideBarActive, setSideBarActive] = useState(false);
    const [cameraOptionsActive, setCameraOptionsActive] = useState(false);

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [projects, setProjects] = useState({})
    const [projectsSet, setProjectsSet] = useState(false)


    useEffect(() => {
        registerUser();
        getUser();
        getUserInfo()
        getAllProjects();
        setIsLoading(false);
    }, []);

    async function registerUser() {
        if (props.user.sub.split('|')[0] === 'auth0')
            props.user.sub = 'Username-Password-Authentication';
        else if (props.user.sub.split('|')[0] === 'google-oauth2')
            props.user.sub = 'google';
        axios.post('https://photocode.app:8443/register', {
            email: props.user.email,
            username: props.user.name,
            picture: props.user.picture,
            password: '',
            connection: props.user.sub.split('|')[0],
        })
        .then(response => {
            console.log(response.data);
        })
            .catch(error => {
            console.log(error);
        });
    }

    async function getUser() {
        // Get user id using the user information
        axios.post('https://photocode.app:8443/getUser', {
            email: props.user.email,
            connection: props.user.sub.split('|')[0]
        })
        .then(response => {
            props.setUser_Id(response.data._id);
            AsyncStorage.setItem('user_id', response.data._id);
        })
        .catch(() => {
            console.log('Error');
        });
    }

    async function getUserInfo() {
        const userInfoResponse = await axios.post(baseUrl + '/getUserInfo', {
            user_id: props.user_id
        })
        userInfo = userInfoResponse.data;
        setEmail(userInfo.email)
        setUsername(userInfo.username)
        getAllProjects()
    }

    async function getAllProjects() {
        const response = await axios.get(baseUrl + `/getAllProjects?user_id=${props.user_id}`);
        setProjects(response.data);
        setProjectsSet(true);
    }

    function handleProjectCreation() {
        console.log("Project Creation");
    }

    //#region Camera Option Animation
    animateCameraOptionsOpen = () => {
        Animated.timing(cameraOptionsYPos, {
            // toValue: (windowHeight/2 - (windowHeight * 0.25)/2),
            toValue: -windowHeight/2 - windowHeight*0.125,
            duration: 300,
            easing: Easing.inertia,
            useNativeDriver: false,
        }).start();
    };
    animateCameraOptionsClose = () => {
        Animated.timing(cameraOptionsYPos, {
            toValue: windowHeight,
            duration: 150,
            // easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => {
            setCameraOptionsActive(!cameraOptionsActive)
        });
    };

    openCameraOptions = () => {
        setCameraOptionsActive(!cameraOptionsActive)
        animateCameraOptionsOpen();
    };

    closeCameraOptions = () => {
        setCameraOptionsActive(!cameraOptionsActive)
        animateCameraOptionsClose();
    };
    //#endregion
        if (isLoading) {
            return <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={[styles.main]}>
                        <Header user={props.user} setUser={props.setUser} />
                        <ScrollView 
                            contentContainerStyle={[styles.projectWrapper]}
                            onScroll={e => {
                                setScrollY(e.nativeEvent.contentOffset.y);
                                if (scrollY < -50) {
                                    getAllProjects();
                                }
                            }}
                            scrollEventThrottle={250}
                        >
                            {projectsSet == true ?
                                projects.map((project, i) => (
                                    <GoToProject
                                        style={styles.project}
                                        key={i}
                                        projectId={project._id}
                                        imageSource={require('./../../assets/images/siteIcon.png')}
                                        projectName={project.name}
                                        projectDescription={project.description}
                                        projectCollaborators={project.collaborators}
                                        user={props.user}
                                        user_id={props.user_id}
                                    />
                                )) : null
                            }
                        </ScrollView>
                        <CreateProject/>
                        <Shadow viewStyle={{alignSelf: 'stretch'}}>
                            <View style={styles.actionView}>
                                <GoToCamera onPress={this.openCameraOptions}/>
                                <ToNewDoc/>
                            </View>
                        </Shadow>
                        <Animated.View style={[{zIndex: 2}, { top: this.cameraOptionsYPos}, {left: windowWidth/2-(windowWidth * 0.6)/2}]}>
                            <CameraOptions onPress={this.closeCameraOptions}/>
                        </Animated.View>
                    </View>
                </View>
            );
        }
    }

function ToNewDoc() {
    const navigation = useNavigation();

    return(
        <Pressable
            onPress={() => {
                navigation.navigate('TextEditor', {
                    fileName: '',
                    initialText: '',
                    editorOrigin: 1,
                });
            }}
        >
            <Image
                style={styles.newFileImage}
                source={require('./../../assets/images/new-file.png')}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        // height: windowHeight,
        // position: 'absolute',
        // justifyContent: 'flex-start',
        // position: 'absolute',
        // backgroundColor: '#FFFFFF',
        // flex: 5,
    },
    projectWrapper: {
        backgroundColor: '#FFFFFF',
        // minHeight must be cameraOptions height + actionBar height + header height
        // cameraOptions height is windowHeight*0.25 + 64 
        // actionBar height is 125
        // headerHeight is 150
        // minHeight: m,
        // flex: 1,
        minHeight: windowHeight*0.637,
    },
    project: {
        // flex: 1,
    },
    target: {
        fontSize: 40,
        paddingTop: 50,
        textAlign: 'center',
        color: 'black',
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
         backgroundColor: '#00C853',
         marginHorizontal: 5,
    },
    date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1,
    },
    actionView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
        width: windowWidth,
    },
    newFileImage: {
        height: windowHeight * 0.09,
        width: windowHeight * 0.09,
    },


});

export default HomeScreen;
