import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { 
    View,
    ScrollView,
    Animated,
    Pressable, 
    Text,
    Image, 
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Alert
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var loadingProgress = new Animated.Value(0);

// Takes a prop that updates a loading state in the parent component 'updateLoading'
export function Loading(props) {
    animateLoadingProgress = () => {
        Animated.timing(loadingProgress, {
            toValue: 10,
            duration: 1500,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            props.updateLoad(false)
            Animated.timing(loadingProgress, {
                toValue: 0,
                duration: 1,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start()
        })
    }  
    
    const loadingColor = loadingProgress.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '100%']
    })

    return (
        <View style={styles.loadingWrapper}>
            <Text style={styles.loadingText}>
                {'Loading'}
            </Text>
            <View style={styles.loadingBarWrapper}>
                <Animated.View style={[styles.loadingBar, {width: loadingColor}]}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingWrapper: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        fontFamily: 'JetBrainsMono-Medium',
    },
    loadingBarWrapper: {
        width: windowWidth/2,
        marginTop: 15,
        borderWidth: 3,
        height: 10,
        borderColor: 'black',
        borderRadius: 10,
    },
    loadingBar: { 
        height: 4,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#0066FF',
    },
});