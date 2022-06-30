import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

class ActionButtons extends React.Component {

    render () {
        return (
            <Shadow viewStyle={{alignSelf: 'stretch'}}>
                <View style={styles.actionView}>
                    <TouchableOpacity onPress={() => {}}>
                        <Image
                            style={styles.scanToTextImage}
                            source={require('../assets/images/scan-to-text.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Image
                            style={styles.newFileImage}
                            source={require('../assets/images/new-file.png')}
                        />
                    </TouchableOpacity>
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
});

export default ActionButtons;
