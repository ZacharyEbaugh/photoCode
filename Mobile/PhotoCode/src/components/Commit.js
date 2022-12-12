import React from 'react';
import PropTypes from 'prop-types';

import { 
    View, 
    Pressable, 
    Text, 
    Image, 
    Dimensions, 
    StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { BackButton } from './BackButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation, useRoute } from '@react-navigation/native';

export function Commit() {
    const navigation = useNavigation();

    const route = useRoute();
    const { UserName } = route.params;
    const { UserImage } = route.params;
    const { CommitTitle } = route.params;
    const { CommitMessage } = route.params;
    const { CommitDate } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <BackButton />
                    <View>
                        <Text style={styles.title}>
                            {CommitTitle}
                        </Text>
                    </View>
            </View>
            <View style={styles.main}>
                <View style={styles.commitInfo}>
                    <Image style={styles.commitImage} source={UserImage} />
                    <Text style={styles.commitDate}>
                        {CommitDate}
                    </Text>
                </View>
                <Text style={styles.commitMessage}>
                    {CommitMessage}
                </Text>
            </View>
        </View>
    );
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
        // justifyContent: 'space-between',
    },
    title: {
        fontSize: 35,
        // marginTop: -100,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },

    commitInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    commitImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    commitDate: {
        fontSize: 20,
        color: '#0066FF',
        fontFamily: 'JetBrainsMono-Medium',
    },
    commitMessage: {
        fontSize: 20,
        color: '#000000',
        fontFamily: 'JetBrainsMono-Medium',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
});
