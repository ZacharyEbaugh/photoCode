import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import SplashPage from './SplashPage';
import Login from './Login';
import Register from './Register';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

import HomeScreen from './HomeScreen';
import Settings from './Settings';
import ProjectFolder from './ProjectFolder';


const Stack = createNativeStackNavigator();


class App extends React.Component {
    render () {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false}}>
                    <Stack.Screen
                        name="SplashPage"
                        component={SplashPage}
                        options={{ title: 'SplashPage' }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: 'My Home' }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ title: 'Register' }}
                    />
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
                        name="ProjectFolder"
                        component={ProjectFolder}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
