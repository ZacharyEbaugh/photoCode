import React, {useEffect, useState} from 'react';
import {    
    View, 
    Text,
    Animated, 
    Pressable, 
    Image, 
    Dimensions, 
    StyleSheet, 
    Easing, 
    ScrollView} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from './../BackButton';
import { CommitList } from './CommitList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// API Setup
const baseUrl = `https://photocode.app:8443`;

// Takes an array of commits from navigation route 
function SourceControl() {
    const route = useRoute();
    const { commitList } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <BackButton />
                    <View>
                        <Text style={styles.title}>
                            Commits
                        </Text>
                    </View>
            </View>
            <ScrollView style={styles.main}>
                {commitList.map((commit, i) => (
                    <CommitList
                        key={i}
                        UserImage={commit.picture}
                        // UserName={props.user.name}
                        CommitTitle={commit.title}
                        CommitDate={commit.date}
                        CommitMessage={commit.message}
                    />
                ))}
            </ScrollView>
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
        fontFamily: 'JetBrainsMono-Medium',
    },
     container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#0066FF',
        // flex: 1.5,
        height: windowHeight*0.2,
        justifyContent: 'space-evenly',
    },
    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
});

export default SourceControl;

