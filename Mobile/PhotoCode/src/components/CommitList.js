import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

import { 
    View, 
    Pressable, 
    Text, 
    Image, 
    Animated,
    LayoutAnimation,
    Dimensions, 
    StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';

export function CommitList({ UserName, UserImage, CommitTitle, CommitMessage, CommitDate }) {
    const navigation = useNavigation();
    const [ShowMessage, setShowMessage] = useState(false);

    const toggleAnimation = {
        duration: 500,
        update: {
            duration: 300,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        delete: {
            duration: 300,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        }
    };
    
    const animationController = useRef(new Animated.Value(0)).current;

    const toggleListItem = () => {
        const config = {
            toValue: ShowMessage ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        };
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation);
        setShowMessage(!ShowMessage);
    };

    const arrowTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <View>
            <View style={styles.commitItem}>
                <Pressable style={styles.commitInfo} onPress={() => toggleListItem()}>
                    <Image style={styles.commitImage} source={UserImage} />
                    <Text style={styles.commitTitle}>
                        {CommitTitle}
                    </Text>
                    <View style={styles.commitDateInfo}>
                        <Text style={styles.commitDate}>
                            {CommitDate}
                        </Text>
                        <Animated.Image style={[styles.infoArrow, {transform: [{rotate: arrowTransform}]}]} source={require('./../assets/images/infoArrow.png')} />
                    </View>
                <View/>
            </Pressable>
            {ShowMessage && (
                <Text style={styles.commitMessage}>
                    {CommitMessage}
                </Text>
            )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    commitItem: {
        alignSelf: 'center',
        flexDirection: 'column',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: windowWidth,
        overflow: 'hidden',
    },
    commitInfo: {
        alignSelf: 'flex-end',
        width: windowWidth * 0.98,
        height: windowHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commitImage: {
        alignSelf: 'center',
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: 100,
    },
    commitTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        color: 'black',
        width: windowWidth * 0.45,
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        Overflow: 'hidden',
    },
    commitDateInfo: {
        alignSelf: 'center',
        height: windowHeight * 0.1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    commitDate: {
        alignSelf: 'flex-start',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 15,
        marginTop: 10,
    },
    infoArrow: {
        alignSelf: 'center',
        resizeMode: 'contain',
        flex: 1,
        width: windowWidth * 0.05,
        height: windowWidth * 0.1,
    },
    commitMessage: {
        alignSelf: 'center',
        width: windowWidth * 0.95,
        marginBottom: 10,
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 15,
        color: 'black',
    },
});
