import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, Alert, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useNavigation } from '@react-navigation/native';
import { GoToCamera } from './ProjectBlock';

// const navigation = useNavigation();

const scanAlert = () =>
  Alert.alert(
    "Scan to Document",
    "",
    [
        {
            text: 'New Document',
            onPress: () => console.warn('new doc'),
            // onPress: () => navigation.navigate('textEditor')
        },
        {
            text: 'Code Snippet',
            onPress: () => console.warn('code snippet'),
        },
        {
            text: 'Cancel',
            onPress: () => console.warn('canceled'),
        },
    ],
  );

function ToNewDoc() {
    const navigation = useNavigation();
    return(
        <Pressable
            onPress={() => {
                navigation.navigate('TextEditor', {
                    fileName: '',
                });
            }}
            // onPressIn={() => {
            //     this.setState({ newDocPressed: !this.state.newDocPressed })
            // }}
            // onPressOut={() => {
            //     this.setState({ newDocPressed: !this.state.newDocPressed })
            // }}
        >
            <Image
                // style={[styles.newFileImage, this.state.newDocPressed && styles.highlight]}
                style={styles.newFileImage}
                source={require('../assets/images/new-file.png')}
            />
        </Pressable>
    );
};


class ActionButtons extends React.Component {

    state = {
        scanPressed: false,
        newDocPressed: false,
    };

    render () {
        return (
            <Shadow viewStyle={{alignSelf: 'stretch'}}>
                <View style={styles.actionView}>
                   <GoToCamera />
                    <ToNewDoc/>
                </View>
            </Shadow>
        );
    }
}

const styles = StyleSheet.create({
    actionView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
    },
    scanToTextImage: {
        height: 100,
        width: 100,
    },
    newFileImage: {
        height: 75,
        width: 75,
    },
    highlight: {
        opacity: 0.5,
    },
});

export default ActionButtons;
