import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import Settings from './Settings';

const Stack = createNativeStackNavigator();


class App extends React.Component {
    render () {
        return (
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
                        options={{ title: 'My Home'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
