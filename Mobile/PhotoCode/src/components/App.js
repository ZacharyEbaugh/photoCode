import React, { useEffect } from 'react';
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
    const { user, isAuthenticated, isLoading } = useAuth0({
        clientId: "Hk5ax5o8U2rqvwffMvGnHUoeajC7Tk2W",
        domain: "photocode.us.auth0.com",
        redirectUri: "org.reactjs.native.example.PhotoCode://photocode.us.auth0.com/ios/org.reactjs.native.example.PhotoCode/callback",
        audience: "https://photocode.auth0.com/api/v2/",
    });

    useEffect(() => {
        console.log("user: ", user);
        console.log("isAuthenticated: ", isAuthenticated);
        console.log("isLoading: ", isLoading);
    }, [user, isAuthenticated, isLoading]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (user == null) {
        return (
            <Auth0Provider domain={"photocode.us.auth0.com"} clientId={"MpksNgQRuYsc9tp9ZJcsgODwhOqjbn1n"}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false}}>
                        <Stack.Screen
                            name="SplashPage"
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
                            component={HomeScreen}
                            options={{ title: 'My Home'}}
                        />
                        <Stack.Screen
                            name="Settings"
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
                            component={ProjectPage}
                        />
                        <Stack.Screen
                            name="ProjectSettings"
                            component={ProjectSettings}
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
                            component={TextEditor}
                        />
                        <Stack.Screen
                            name="SaveDoc"
                            component={SaveDoc}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Auth0Provider>
        );
    }
}

export default App;
