import React, { useState, useEffect } from 'react';
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

import ProjectPage from './project/ProjectPage';
import CameraView from './CameraView';


const Stack = createNativeStackNavigator();

import { Text, View } from 'react-native';

const App = () => {

    const [user, setUser] = useState(null);
    const [user_id, setUser_Id] = useState(null);
    
    useEffect(() => {
        console.log(user);
        console.log(user_id);
    }, [user, user_id]);

    if (user == null) {
        return (
            <Auth0Provider domain={"photocode.us.auth0.com"} clientId={"MpksNgQRuYsc9tp9ZJcsgODwhOqjbn1n"}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false}}>
                        <Stack.Screen
                            name="SplashPage"
                            component={() => <SplashPage isUser={user} setUser={setUser} />}
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
                            component={() => <HomeScreen user={user} setUser={setUser} user_id={user_id} setUser_Id={setUser_Id}/>}
                            options={{ title: 'My Home'}}
                        />
                        <Stack.Screen
                            name="Settings"
                            component={() => <Settings user={user} user_id={user_id}/>}
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
                            component={() => <ProjectPage user={user}/>}
                        />
                        <Stack.Screen
                            name="ProjectSettings"
                            component={ProjectSettings}
                        />
                        <Stack.Screen
                            name="SourceControl"
                            component={() => <SourceControl user={user}/>}
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
                            component={() => <TextEditor user={user}/>}
                        />
                        <Stack.Screen
                            name="SaveDoc"
                            component={() => <SaveDoc user={user} user_id={user_id}/>} 
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Auth0Provider>
        );
    }
}

export default App;
