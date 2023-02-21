import React from 'react';
import {    
    View, 
    Text,
    Dimensions, 
    StyleSheet, 
    ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { BackButton } from './../BackButton';
import { CommitList } from './CommitList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DisplayCommits() {
    const route = useRoute();
    const { commits } = route.params;

    return (
        commits.map((commit, i) => (
            <CommitList
                key={i}
                UserImage={commit.picture}
                CommitTitle={commit.title}
                CommitDate={commit.date}
                CommitMessage={commit.message}
            />
        ))
    )
}

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
                <ScrollView style={styles.main}>
                   <DisplayCommits />
                </ScrollView>
            </View>
        );
    }
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
        justifyContent: 'space-evenly',
        height: windowHeight*0.2,
    },
    main: {
        backgroundColor: '#FFFFFF',
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

