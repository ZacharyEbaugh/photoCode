import React from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useRoute, useNavigation } from '@react-navigation/native';
import { BackButton } from './../BackButton';

function DeleteProject() {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.optionButtons}
            onPress={() => {
                Alert.alert(
                    "Are you sure you want to delete this project?",
                    "",
                    [
                        {
                            text: 'Confirm',
                            onPress: () => navigation.navigate('HomeScreen'),
                        },
                        {
                            text: 'Cancel',
                        },
                    ],
                )
            }}
        >
            <Text style={styles.deleteText}>
                {'Delete Project'}
            </Text>
        </Pressable>
    )
}

function ProjectNameInput() {
    const route = useRoute();
    const { projectName } = route.params;
    return (
        <View>
            <TextInput
                style={styles.newProjectName}
                placeholder={projectName}
                placeholderTextColor={'#000000'}
                // onChangeText={(text) => this.setState({text})}
                // value={this.state.text}
            />
        </View>
    );
}

function ConfirmNameChange() {
    const navigation = useNavigation();
    return (
         <Pressable
            style={styles.confirmProjectName}      
            onPress={() => {
                Alert.alert(
                    "Are you sure you want to change the name of the project?",
                    "",
                    [
                        {
                            text: 'Confirm',
                            onPress: () => navigation.navigate('HomeScreen'),
                        },
                        {
                            text: 'Cancel',
                        },
                    ],
                )
            }}
          >
        <Image
            style={styles.confirmProjectNameImage}
            source={require('./../../assets/images/checkmark.png')}
        />
        </Pressable>
    )
}       


class ProjectSettings extends React.Component {

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <BackButton/>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            {'Project Settings'}
                        </Text>
                    </View>
                </View>

                <View style={styles.main}>
                    <ScrollView>
                        <View style={styles.optionWrapper}>
                            <Text style={styles.sectionHeaders}>
                                {'Project Name'}
                            </Text>
                            <View style={styles.blackLine} />
                            {/* <Pressable
                                style={styles.optionButtons}
                                onPress={() => {}}
                            >
                                <Text style={styles.optionText}>
                                    {'Change Project Name'}
                                </Text>
                            </Pressable> */}
                            <View style={styles.projectNameChange}>
                                <ProjectNameInput/>
                                <ConfirmNameChange/>

                            </View>
                            
                        </View>
                        <View style={styles.optionWrapper}>
                            <Text style={styles.dangerHeader}>
                                {'Danger'}
                            </Text>
                            <View style={styles.blackLine} />
                            
                            <DeleteProject/>
                        </View>
                        
                    </ScrollView>
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
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
    optionWrapper: {
        width: windowWidth * 0.8,
        alignSelf: 'center',
    },
    sectionHeaders: {
        textAlign: 'left',
        fontSize: 25,
        color: '#989898',
        marginVertical: 10,
        marginLeft: windowWidth * 0.05,
        fontFamily: 'JetBrainsMono-Medium',
    },
    blackLine: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
    },
    optionButtons: {
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 3,
        padding: 10,
        marginVertical: 10,
    },
    optionText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
    projectNameChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    confirmProjectName: {
        backgroundColor: '#0066FF',
        borderRadius: 10,
        borderWidth: 3,
        padding: 6,
        margin: 10,
    },
    confirmProjectNameImage: {
        width: 40,
        height: 40,
    },
    newProjectName: {
        width: windowWidth * 0.65,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 3,
        paddingVertical: 10,
        marginVertical: 10,
        paddingLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
    dangerHeader: {
        textAlign: 'left',
        fontSize: 25,
        color: 'red',
        marginVertical: 10,
        marginLeft: windowWidth * 0.05,
        fontFamily: 'JetBrainsMono-Medium',
    },
    deleteText: {
        textAlign: 'center',
        fontSize: 24,
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
   
    
    
});

export default ProjectSettings;
