import React, {useState, useEffect, useRef, useContext, memo} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import loginContext from './loginContext';

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
    Button,
    Alert} from 'react-native';

import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';

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

class HomeScreen extends React.Component { 
    render() {
        return (
            <Home />
        );
    }
}

function Home(props) {

    const [scrollY, setScrollY] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const [sideBarActive, setSideBarActive] = useState(false);
    const [cameraOptionsActive, setCameraOptionsActive] = useState(false);

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [projects, setProjects] = useState({})
    const [projectsSet, setProjectsSet] = useState(false)
    const [userInfoState, setUserInfoState] = useState(null)

    const { user, userId, setUserId, userInfo, setUserInfo } = useContext(loginContext)

    // console.log("user from context " + user.email)


    useEffect(() => {
        // console.log(user)
        registerUser();
        getUser();
        getUserInfo();
        getAllProjects();
        // rprops.setIsLoading(false);
    }, [projectsSet]);

    async function registerUser() {
        if (user.sub.split('|')[0] === 'auth0')
            user.sub = 'Username-Password-Authentication';
        else if (user.sub.split('|')[0] === 'google-oauth2')
            user.sub = 'google';
        axios.post('https://photocode.app:8443/register', {
            email: user.email,
            username: user.name,
            picture: user.picture,
            password: '',
            connection: user.sub.split('|')[0],
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log("Register: " + error);
        });
    }

    async function getUser() {
        // Get user id using the user information
        axios.post('https://photocode.app:8443/getUser', {
            email: user.email,
            connection: user.sub.split('|')[0]
        })
        .then(async(response) => {
            console.log(response.data._id);
            // props.setUser_Id(response.data._id);
            await AsyncStorage.setItem("user_id", response.data._id);
            setUserId(response.data._id);
        })
        .catch((e) => {
            console.log('Get User: ' + e);
        });
    }

    async function getUserInfo() {
        user_id = await AsyncStorage.getItem("user_id");
        const userInfoResponse = await axios.post(baseUrl + '/getUserInfo', {
            user_id: user_id
        })
        newUserInfo = userInfoResponse.data;
        setUserInfo(newUserInfo)
        
        
        
        setEmail(newUserInfo.email)
        setUsername(newUserInfo.username)

        // getAllProjects()
    }

    async function getAllProjects() {
        user_id = await AsyncStorage.getItem("user_id");
        const response = await axios.get(baseUrl + `/getAllProjects?user_id=${user_id}`);
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
        if (props.isLoading) {
            getAllProjects();
            props.setIsLoading(false);
            return <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={[styles.main]}>
                        <Header />
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
                                        key={i}
                                        projectId={project._id}
                                        imageSource={require('./../../assets/images/siteIcon.png')}
                                        projectName={project.name}
                                        projectDescription={project.description}
                                        projectCollaborators={project.collaborators}
                                        // user={props.user}
                                        // user_id={props.user_id}
                                    />
                                    
                                )) : null
                            }
                            <View style={styles.padding}></View>
                        </ScrollView>
                        <CreateProject user_id={props.user_id} setIsLoading={props.setIsLoading}/>
                        <Shadow viewStyle={{alignSelf: 'stretch'}}>
                            <View style={styles.actionView}>
                                <GoToCamera onPress={this.openCameraOptions}/>
                                <ToNewDoc/>
                            </View>
                        </Shadow>

                        <BlurView style={[styles.blur, cameraOptionsActive && {opacity: 1}]} blurType='light' blurAmount={10}/>

                        <Animated.View style={[{zIndex: 5}, { top: this.cameraOptionsYPos}, {left: windowWidth/2-(windowWidth * 0.6)/2}]}>
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
        height: windowHeight * 0.125,
        // position: 'absolute',
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
    blur: {
        zIndex: 5,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0
    },
    padding: {
        height: windowHeight * 0.2,
    }
});

export default HomeScreen;
