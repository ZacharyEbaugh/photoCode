import React, {useEffect, useState} from 'react';
import {    
    View, 
    Text,
    Animated, 
    Pressable, 
    Image, 
    Dimensions, 
    StyleSheet, 
    Easing } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from './../BackButton';
import { CommitList } from './CommitList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// API Setup
const baseUrl = `https://photocode.app:8443`;



// var commits= [
//   {
//     UserName: 'Zachary Ebaugh',
//     ProfilePicture: require('./../../assets/images/zacProfilePic.jpg'),
//     Title: 'Fix router bug',
//     Message: 'Implement all pages into the router blah blah blah blah blah',
//     Date: 'Aug 1, 2021',
//   },
//   // We will need to limit the length of the title, message and be however long
//   {
//     UserName: 'Brandon Spangler',
//     ProfilePicture: require('./../../assets/images/brandonProfilePic.png'),
//     Title: 'Upgrade to React Native 0.64',
//     Message: 'Upgrading to React Native 0.65 took blah blah React Native 0.65 took blah blahReact Native 0.65 took blah blahReact Native 0.65 took blah blah',
//     Date: 'Aug 19, 2021',
//   },
// ];

function SourceControl(props) {

    const [loading, setLoading] = useState(true);
    const [commits, setCommits] = useState([])

    const route = useRoute();
    const { projectId } = route.params;
    console.warn(projectId)

    async function getCommits(projectId) {  
        var response = await axios.post(baseUrl + `/getAllCommits`, {
            project_id: projectId,
        }).then(async res => {
            setCommits(res.data.reverse())
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false)
        });
        
        
    };

    useEffect(() => {
        getCommits(projectId);
        // console.warn(props.user.name)
    }, [])

    return (
        loading == true ? (<View style={styles.loadingWrapper}><Text style={styles.loadingText}>{'Loading'}</Text></View>) :
        <View style={styles.container}>
            <View style={styles.header}>
                    <BackButton />
                    <View>
                        <Text style={styles.title}>
                            Commits
                        </Text>
                    </View>
            </View>
            <View style={styles.main}>
                {commits.map((commit, i) => (
                    <CommitList
                        key={i}
                        UserImage={commit.picture}
                        UserName={props.user.name}
                        CommitTitle={commit.title}
                        CommitDate={commit.date}
                        CommitMessage={commit.message}
                    />
                ))}
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
        fontFamily: 'JetBrainsMono-Medium',
    },
     container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#0066FF',
        flex: 1.5,
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

