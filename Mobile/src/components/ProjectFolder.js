import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation, useRoute } from '@react-navigation/native';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Pressable
      // title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    >
        <Text style={styles.backText}>
            {'< Back'}
        </Text>
    </Pressable>

  );
}

function GetProjectName() {
    const route = useRoute();
    const { projectName } = route.params;

    return (
        <Text style={styles.title}>
            {projectName}
        </Text>
    );
}



class ProjectFolder extends React.Component {

    // static propTypes = {
    //     projectName: PropTypes.string.isRequired,
    // };



    render () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName='HomeScreen' />
                    </View>
                    <View>
                        <GetProjectName />
                    </View>
                    <View style={styles.searchArea}>
                        <Pressable onPress={() => {}} >
                            <Image style={styles.searchImage} source={require('../assets/images/search.png')} />
                        </Pressable>
                        <TextInput
                            style={styles.search}
                            placeholder='Search Folder'
                        />
                    </View>
                </View>

                <View style={styles.main}>

                </View>
            </View>

        );
    }
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
    backButton: {
        marginTop: 40,
        marginLeft: 10,
    },
    backText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
    title: {
        fontSize: 35,
        // marginTop: -100,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
    projectBlock: {
        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginVertical: 10,
    },
    projectContent: {
        flexDirection: 'row',
    },
    projectImage: {
        marginVertical: 10,
        marginHorizontal: 15,
        height: 75,
        width: 75,
    },
    textBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectText: {
        fontSize: 30,
    },
    infoBlock: {
        marginVertical: 10,
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
    searchArea: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 5,
        width: windowWidth * 0.8,
        alignSelf: 'center',
    },
    search: {
        width: windowWidth * 0.75,
        height: 40,
        fontSize: 30,
        textAlign: 'left',
        paddingLeft: 20,
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});

export default ProjectFolder;
