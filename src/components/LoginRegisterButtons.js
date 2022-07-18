import React, {useState} from 'react';

import LoginScreen from './Login';
import RegisterScreen from './Register';
// import Splash from './SplashPage';

import
    {
        View,
        Text,
        Pressable,
        StyleSheet,
    } from 'react-native';

const actionNames = ['Login', 'Register'];

import { useNavigation } from '@react-navigation/native';

function GoToButton({ screenName, action }) {
    const navigation = useNavigation();

    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            style={[isPressed && styles.opacity]}
            onPress={() => navigation.navigate(screenName)}
            onPressIn={() => {
                setIsPressed(current => !current);
            }}
            onPressOut={() => {
                setIsPressed(current => !current);
            }}
        >
            <Text style={styles.buttons}>
                {actionNames[action]}
            </Text>

        </Pressable>

    );
}


class LoginRegister extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <View>
                    <GoToButton screenName={LoginScreen} action={0}/>
                </View>
                <View>
                    <GoToButton screenName={RegisterScreen} action={1}/>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create ({
    container: {
        // backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 460,
    },

    buttons: {
        height: 80,
        width: 300,
        fontSize: 40,
        backgroundColor: '#0066FF',
        color: 'white',
        // fontFamily: 'JetBrainsMono-Regular',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 14,
        padding: 10,
        textAlign: 'center',
        marginBottom: 20,
        zIndex: 9999,
        elevation: 9999,
    },
    opacity: {
        opacity: 0.8,
    },
});


export default LoginRegister;
