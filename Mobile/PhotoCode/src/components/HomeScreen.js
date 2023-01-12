import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {    
    View, 
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

import Header from './Header';
import SideBar from './SideBar';
import { GoToProject } from './GoToProject';
import GoToCamera from './GoToCamera';
import CameraOptions from './CameraOptions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Hard Coded User Information 
id = '63bc7385c38907624d094eaa';

// API Setup
const baseUrl = "https://photocode.app:8443";

// Animation Starting Values
sideBarXPos = new Animated.Value(-windowWidth * 0.7);
cameraOptionsYPos = new Animated.Value(windowHeight);

function HomeScreen() {

    const [sideBarActive, setSideBarActive] = useState(false);
    const [cameraOptionsActive, setCameraOptionsActive] = useState(false);

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [projects, setProjects] = useState({})
    const [projectsSet, setProjectsSet] = useState(false)

    getAllProjects = async () => {
        var response = await axios.get(baseUrl + `/getAllProjects?user_id=${id}`)
        setProjects(response.data)
        setProjectsSet(true)
    }

    useEffect(() => {
        async function getUserInfo() {
            var userInfoResponse = await axios.post(baseUrl + '/getUserInfo', {
                user_id: id
            })
            userInfo = userInfoResponse.data;
            setEmail(userInfo.email)
            setUsername(userInfo.username)
            getAllProjects()
        }
        getUserInfo()
    }, []);
    

    //#region Sidebar Animations
    animateSideBarOpen = () => {
        Animated.timing(sideBarXPos, {
            toValue: 0,
            duration: 200,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start();
    };
    animateSideBarClose = () => {
        Animated.timing(sideBarXPos, {
            toValue: -windowWidth * 0.7,
            duration: 150,
            // easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => {
            setSideBarActive(!sideBarActive);
        });
    };

    openSidebar = () => {
        setSideBarActive(!sideBarActive);
        animateSideBarOpen();
    };

    closeSidebar = () => {
        animateSideBarClose();
    };
    //#endregion

    //#region Camera Option Animation
    animateCameraOptionsOpen = () => {
        Animated.timing(cameraOptionsYPos, {
            toValue: (windowHeight/2 - (windowHeight * 0.25)/2),
            duration: 200,
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

        return (
            <View style={styles.container}>
                <Animated.View style={[{zIndex: 3}, { left: sideBarXPos}]}>
                    {sideBarActive && (
                        <SideBar onPress={closeSidebar} userName={username}/>
                    )}
                </Animated.View>

                <Animated.View style={[{zIndex: 2}, { top: this.cameraOptionsYPos}, {left: windowWidth/2-(windowWidth * 0.6)/2}]}>
                        <CameraOptions onPress={this.closeCameraOptions}/>
                </Animated.View>

                <View style={{zIndex: 1, position: 'absolute', height: windowHeight, alignSelf: 'center'}}>
                    <Header
                        onPress={openSidebar}
                    />
                    <ScrollView style={styles.main}>
                        {projectsSet == true ?
                            projects.map((project, i) => (
                                <GoToProject
                                    key={i}
                                    projectId={project._id}
                                    imageSource={require('../assets/images/siteIcon.png')}
                                    projectName={project.name}
                                    // languageOne={project.languageOne}
                                    // languageTwo={project.languageTwo}
                                    // languageThree={project.languageThree}
                                    // date={project.date}
                                />
                            )) : null
                        }
                    </ScrollView>
                    <Shadow viewStyle={{alignSelf: 'stretch'}}>
                        <View style={styles.actionView}>
                            <GoToCamera onPress={this.openCameraOptions}/>
                            <ToNewDoc/>
                        </View>
                    </Shadow>
                </View>
            </View>
        );
    }


function ToNewDoc() {
    const navigation = useNavigation();

    return(
        <Pressable
            onPress={() => {
                navigation.navigate('TextEditor', {
                    fileName: '',
                    initialText: '',
                });
            }}
        >
            <Image
                style={styles.newFileImage}
                source={require('../assets/images/new-file.png')}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        backgroundColor: '#FFFFFF',
        // flex: 5,
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
        width: '100%',
    },
    newFileImage: {
        height: 75,
        width: 75,
    },
});

export default HomeScreen;
