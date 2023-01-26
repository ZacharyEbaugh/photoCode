import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import { View, ScrollView, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';
import { BackButton } from './../BackButton';
import SearchCollaborators from './SearchCollaborators';

function ProjectSettings(props) {
    const [loading, setLoading] = useState(true);

    const [user_id, setUser_Id] = useState('');
    const [project_id, setProject_Id] = useState('');

    const [projectNamePlaceholder, setProjectNamePlaceholder] = useState('');
    const [projectDescriptionPlaceholder, setProjectDescriptionPlaceholder] = useState('');

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('\n');

    const [projectOwner, setProjectOwner] = useState('');
    const [collaboratorsInfo, setCollaboratorsInfo] = useState([]);

    // Get project information from route params and set state
    // Make axios call to get users information based on user ID
    useEffect(() => {
        _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('project_id');
                if (value !== null) {
                    setProject_Id(value);
                    getProject(value);
                }
            } catch (error) {
                // Error retrieving data
                console.warn(error);
            }
        };
        async function getProject(project_id) {
            const response = await axios.get(`https://photocode.app:8443/getProject?project_id=${project_id}`)
            const user_id = await AsyncStorage.getItem('user_id');
            setUser_Id(user_id);
            setProjectNamePlaceholder(response.data.name);
            setProjectDescriptionPlaceholder(response.data.description);
            setProjectDescription('');
            setProjectOwner(response.data.user);
            getCollaboratorsInfo(project_id);
        }
        _retrieveData();
        setLoading(false);
    }, []);

    function ConfirmNameChange() {
        return (
            <Pressable
                style={styles.confirmProjectName}      
                onPress={() => {
                    axios.post('https://photocode.app:8443/updateProject', {
                        project_id: project_id,
                        name: (projectName === '') ? projectNamePlaceholder : projectName,
                        description: (projectDescription === '') ? projectDescriptionPlaceholder : projectDescription
                    })
                    .then((response) => {
                        setProjectNamePlaceholder(projectName);
                        setProjectDescriptionPlaceholder(projectDescription);
                    })
                    .catch((error) => {
                        console.warn("Update Project: " + error);
                    }
                )
            }}>
                <Text style={styles.confirmProjectNameText}>
                    {'Update Project'}
                </Text>
            </Pressable>
        )
    }   

    async function getCollaboratorsInfo(projectId) {
        const response2 = await axios.get('https://photocode.app:8443/getCollaborators', {
            params: {
                project_id: projectId
            }
        })
        setCollaboratorsInfo(response2.data);
    }

    function ListCollaborators({projectCollaborators}) {
        return projectCollaborators.map((collaborator, i) => {
            return (
                <Pressable style={styles.collaborator} key={i}>
                    <Image source={{uri: collaborator.picture}} style={styles.collaboratorsImage} />
                    <Text style={styles.collaboratorName}>
                        {collaborator.username}
                    </Text>
                    {(collaborator._id === projectOwner) ? <Text style={styles.collaboratorOwner}>Owner</Text> : 
                        (props.user_id != projectOwner) ? <Text style={styles.collaboratorOwner}>Member</Text>  :
                        <Pressable style={styles.removeCollaborator} onPress={() => {removeCollaborator(collaborator._id, project_id)}}>
                        <Text style={styles.removeCollaboratorText}>
                            {'x'}
                        </Text>
                    </Pressable>
                    }
                </Pressable>
            );
        })
    }

    async function removeCollaborator(collaboratorID, projectID) {
        await axios.get('https://photocode.app:8443/removeCollaborator', {
            params: {
                user_id: collaboratorID,
                project_id: projectID
            }
        })
        .then((response) => {
            getCollaboratorsInfo(projectID);
        }, (error) => {
            console.log(error);
        });
    }

    async function handleProjectUpdate() {
        const update = await axios.post('https://photocode.app:8443/updateProject', {
            project_id: project_id,
            name: (projectName === '') ? projectNamePlaceholder : projectName,
            description: (projectDescription === '') ? projectDescriptionPlaceholder : projectDescription
        })
        .then(() => {
            if (projectName != '')
                setProjectNamePlaceholder(projectName);
            if (projectDescription != '')
                setProjectDescriptionPlaceholder(projectDescription);
        })
        .catch((error) => {
            console.warn(error);
        });
        Promise.resolve(update);
        setProjectName('');
        setProjectDescription('');
    }

    function DeleteProject() {
        const navigation = useNavigation();

        if (user_id === projectOwner)
            return (
                <View style={styles.optionWrapper}>
                    <Text style={styles.dangerHeader}>
                        {'Danger'}
                    </Text>
                    <View style={styles.blackLine} />
                    <Pressable
                        style={styles.optionButtons}
                        onPress={() => {
                            Alert.alert(
                                "Are you sure you want to delete this project?",
                                "",
                                [
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            axios.post('https://photocode.app:8443/deleteProject', {
                                                project_id: project_id,
                                            })
                                            .then((response) => {
                                                console.log(response);
                                                props.setIsLoading(true);
                                                navigation.navigate('HomeScreen');
                                            })
                                            .catch((error) => {
                                                console.log("Delete project: " + error);
                                            });
                                        }
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
                </View>
                
            )
        else
            return null;
    }

    return (
        loading == true ? (<View style={styles.loadingWrapper}><Text style={styles.loadingText}>{'Loading'}</Text></View>) :
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
                            {'Name'}
                        </Text>
                        <View style={styles.blackLine} />
                        <View style={styles.projectNameChange}>
                            <View style={styles.section}>
                                <TextInput
                                    style={styles.newProjectName}
                                    placeholder={projectNamePlaceholder}
                                    placeholderTextColor={'grey'}
                                    value={projectName}
                                    onChangeText={(text) => setProjectName(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.optionWrapper}>
                        <Text style={styles.sectionHeaders}>
                            {'Description'}
                        </Text>
                        <View style={styles.blackLine} />
                        <View style={styles.projectNameChange}>
                            <View style={styles.section}>
                                <TextInput
                                    editable
                                    style={styles.newProjectDescription}
                                    placeholder={projectDescriptionPlaceholder}
                                    placeholderTextColor={'grey'}
                                    multiline
                                    numberOfLines={4}
                                    value={projectDescription}
                                    onChangeText={(text) => setProjectDescription(text)}
                                />
                            </View>
                            <Pressable
                                style={styles.confirmProjectName}      
                                onPress={() => {handleProjectUpdate()}}>
                                <Text style={styles.confirmProjectNameText}>
                                    {'Update Project'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.optionWrapper}>
                        <Text style={styles.sectionHeaders}>
                            {'Collaborators'}
                        </Text>
                        <View style={styles.blackLine} />
                        <View style={styles.projectCollaboratorsChange}>
                            <ListCollaborators projectCollaborators={collaboratorsInfo}/>
                            {/* <AddCollaborator/> */}
                            <SearchCollaborators projectName={projectNamePlaceholder}/>
                        </View>
                    </View>
                    <DeleteProject/>
                    <View style={styles.padding}/>
                </ScrollView>
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
        flexDirection: 'column',
    },
    sectionHeaders: {
        textAlign: 'left',
        fontSize: 25,
        color: '#989898',
        marginVertical: 10,
        marginLeft: windowWidth * 0.05,
        fontFamily: 'JetBrainsMono-Medium',
    },
    section: {
        flexDirection: 'column',
    },
    blackLine: {
        borderWidth: 1,
        width: windowWidth * 0.85,
        height: 2,
        alignSelf: 'center',
        borderRadius: 5,
        color: 'grey',
        borderColor: 'grey',
    },
    optionButtons: {
        width: windowWidth * 0.8,
        backgroundColor: 'red',
        borderRadius: 10,
        // borderWidth: 3,
        padding: 10,
        marginVertical: 10,
    },
    optionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
    projectNameChange: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    confirmProjectName: {
        width: windowWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
        borderRadius: 10,
        // borderWidth: 3,
        padding: 10,
        margin: 10,
    },
    confirmProjectNameImage: {
        width: 40,
        height: 40,
    },
    newProjectName: {
        width: windowWidth * 0.8,
        height: 60,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        // borderWidth: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingLeft: 10,
        fontSize: 24,
        fontFamily: 'JetBrainsMono-light',
    },
    newProjectDescription: {
        width: windowWidth * 0.8,
        height: 100,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        // borderWidth: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingLeft: 10,
        fontSize: 24,
        fontFamily: 'JetBrainsMono-light',
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
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
    collaboratorsImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    collaboratorsList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth,
    },
    collaborator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    collaboratorName: {
        fontSize: 24,
        fontFamily: 'JetBrainsMono-Medium',
        width: windowWidth * 0.4,
    },
    collaboratorOwner: {
        fontSize: 15,
        fontFamily: 'JetBrainsMono-light',
        color: 'black',
    },
    removeCollaborator: {
        backgroundColor: 'red',
        borderRadius: 11,
        // borderWidth: 2,
        padding: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    removeCollaboratorText: {
        fontSize: 24,
        fontFamily: 'JetBrainsMono-Medium',
        color: 'white',
    },
    confirmProjectNameText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 24,
        color: 'white',
    },
    padding: {
        height: 60,
    },
});

export default ProjectSettings;
