import React from 'react';
import {    
    View, 
    Text,
    Animated, 
    Pressable, 
    Image, 
    Dimensions, 
    StyleSheet, 
    Easing } from 'react-native';

import { BackButton } from './BackButton';
import { CommitList } from './CommitList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var commits= [
  {
    UserName: 'Zachary Ebaugh',
    ProfilePicture: require('./../assets/images/zacProfilePic.jpg'),
    Title: 'Fix router bug',
    Message: 'Implement all pages into the router blah blah blah blah blah',
    Date: 'Aug 1, 2021',
  },
  // We will need to limit the length of the title, message and be however long
  {
    UserName: 'Brandon Spangler',
    ProfilePicture: require('./../assets/images/brandonProfilePic.png'),
    Title: 'Upgrade to React Native 0.64',
    Message: 'Upgrading to React Native 0.65 took blah blah React Native 0.65 took blah blahReact Native 0.65 took blah blahReact Native 0.65 took blah blah',
    Date: 'Aug 19, 2021',
  },
];

class SourceControl extends React.Component {
    render() {
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
            <View style={styles.main}>
                {commits.map((commit, i) => (
                    <CommitList
                        key={i}
                        UserImage={commit.ProfilePicture}
                        UserName={commit.UserName}
                        CommitTitle={commit.Title}
                        CommitDate={commit.Date}
                        CommitMessage={commit.Message}
                    />
                ))}
            </View>
        </View>
        );
    };
}

const styles = StyleSheet.create({
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

