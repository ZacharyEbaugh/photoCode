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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';

export function GoToProject({ projectId, imageSource, projectName, languageOne, languageTwo, languageThree, date }) {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate('ProjectPage', { projectId, projectName });
            }}
        >
            <View style={styles.projectBlock}>
                <Shadow viewStyle={{alignSelf: 'stretch'}} radius={10}>
                    <View style={styles.projectContent}>
                        <Image style={styles.projectImage} source={imageSource} />

                        <View style={styles.textBlock}>
                            <Text style={styles.projectText}>
                                {projectName}
                            </Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <View style={styles.commonLanguage}>
                                <Text style={styles.sideText}>
                                    {languageOne}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageOneColor]} />
                            </View>
                            <View style={styles.commonLanguage}>
                                <Text style={styles.sideText}>
                                    {languageTwo}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageTwoColor]} />
                            </View>
                            <View style={styles.commonLanguage}>
                                <Text style={styles.sideText}>
                                    {languageThree}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageThreeColor]} />
                            </View>
                            <View style={styles.date}>
                                <Text style={styles.sideText}>
                                    {date}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Shadow>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    projectBlock: {
        alignSelf: 'center',
        // marginVertical: windowHeight * 0.02,
        marginTop: windowHeight * 0.02,
    },
    projectContent: {
        flexDirection: 'row',
        width: windowWidth * 0.8,
        borderRadius: 10,
    },
    projectImage: {
        marginVertical: 10,
        marginHorizontal: 15,
        height: 75,
        width: 75,
        resizeMode: 'contain',
    },
    textBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectText: {
        fontSize: windowWidth * 0.055,
        fontFamily: 'JetBrainsMono-Regular',
    },
    sideText: {
        fontSize: windowWidth * 0.03,
        fontFamily: 'JetBrainsMono-Regular',
    },
    infoBlock: {
        marginVertical: 10,
        justifyContent: 'center',
    },
    commonLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 1, 
    },
    languageCircle: {
         width: 10,
         height: 10,
         borderRadius: 10 / 2,
         marginHorizontal: 5,
    },
    languageOneColor: {
         backgroundColor: '#FF5C00',
    },
    languageTwoColor: {
         backgroundColor: '#00D1FF',
    },
    languageThreeColor: {
         backgroundColor: '#FFE600',
    },
    date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1,
    },
    scanToTextImage: {
        height: 100,
        width: 100,
    },
});
