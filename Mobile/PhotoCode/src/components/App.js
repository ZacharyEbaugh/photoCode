import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

import SplashPage from './user_initialization/SplashPage';
import HomeScreen from './user_initialization/HomeScreen';

import AboutUs from './sidebar/AboutUs';
import ContactUs from './sidebar/ContactUs';
import Settings from './sidebar/Settings';

import { Commit } from './project/Commit';
import TextEditor from './project/TextEditor';
import SaveDoc from './project/SaveDoc';
import SourceControl from './project/SourceControl';
import ProjectSettings from './project/ProjectSettings';
import CreateProject from './user_initialization/CreateProject';

import ProjectPage from './project/ProjectPage';
import CameraView from './CameraView';

import loginContext from './user_initialization/loginContext';

const Stack = createNativeStackNavigator();

const App = () => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const [updateProjects, setUpdateProjects] = useState(false);

    return (
        <loginContext.Provider value={{user, setUser, userId, setUserId, userInfo, setUserInfo, updateProjects, setUpdateProjects}}>
            <MainContent />
        </loginContext.Provider>
    );
}

const MainContent = () => {

    // const [user, setUser] = useState(null);
    // const [user_id, setUser_Id] = useState(null);
    const {user, setUser, userId, setUserId } = useContext(loginContext);

    // Need to integrate into context
    // For now it is removed 
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        console.log(user);
        console.log(userId);
    }, [user, userId]);


    if (user == null) {
        return (
                <Auth0Provider domain={"photocode.us.auth0.com"} clientId={"MpksNgQRuYsc9tp9ZJcsgODwhOqjbn1n"}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false}}>
                            <Stack.Screen
                                name="SplashPage"
                                // component={() => <SplashPage isUser={user} setUser={setUser} />}
                                component={SplashPage}
                                options={{ title: 'SplashPage' }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Auth0Provider>
        );
    }

    else {
        return (
                <Auth0Provider domain={"photocode.us.auth0.com"} clientId={"MpksNgQRuYsc9tp9ZJcsgODwhOqjbn1n"}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false}}>
                            <Stack.Screen
                                name="HomeScreen"
                                // component={() => <HomeScreen user={user} setUser={setUser} user_id={user_id} setUser_Id={setUser_Id} isLoading={isLoading} setIsLoading={setIsLoading}/>}
                                component={HomeScreen}
                                options={{ title: 'My Home'}}
                            />
                            <Stack.Screen
                                name="Settings"
                                // component={() => <Settings user={user} user_id={user_id} setUser={setUser}/>}
                                component={Settings}
                            />
                            <Stack.Screen
                                name="About Us"
                                component={AboutUs}
                                options={{ title: 'About Us' }}
                            />
                            <Stack.Screen
                                name="Contact Us"
                                component={ContactUs}
                                options={{ title: 'Contact Us' }}
                            />
                            <Stack.Screen
                                name="ProjectPage"
                                // component={() => <ProjectPage user={user} user_id={user_id}/>}
                                component={ProjectPage}
                            />
                            <Stack.Screen
                                name="ProjectSettings"
                                // component={() => <ProjectSettings user={user} user_id={user_id} isLoading={isLoading} setIsLoading={setIsLoading}/> }
                                component={ProjectSettings}
                            />
                            <Stack.Screen
                                name="CreateProject"
                                // component={() => <CreateProject user={user} user_id={user_id} isLoading={isLoading} setIsLoading={setIsLoading}/>}
                                component={CreateProject}
                            />
                            <Stack.Screen
                                name="SourceControl"
                                component={SourceControl}
                                options={{ title: 'SourceControl' }}
                            />
                            <Stack.Screen
                                name="Commit"
                                component={Commit}
                                options={{ title: 'Commit' }}
                            />
                            <Stack.Screen
                                name="CameraView"
                                component={CameraView}
                            />
                            <Stack.Screen
                                name="TextEditor"
                                // component={() => <TextEditor user={user} user_id={user_id}/>}
                                component={TextEditor}
                            />
                            <Stack.Screen
                                name="SaveDoc"
                                // component={() => <SaveDoc user={user} user_id={user_id}/>} 
                                component={SaveDoc}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Auth0Provider>
        );
    }
}

export default App;
