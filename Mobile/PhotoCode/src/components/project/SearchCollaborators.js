import { Modal, PanResponder, Animated, TextInput, TouchableOpacity, Pressable, View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchCollaborators = ({projectName}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);
    const [collaboratorsList, setCollaboratorsList] = useState([]);
    const [project_id, setProject_id] = useState('');
    const [searchUser, setSearchUser] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [pan] = useState(new Animated.Value(0));
    const [panResponder] = useState(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
            return gestureState.dy > 10;
            },
            onPanResponderMove: (evt, gestureState) => {
                Animated.event([null, { dy: pan }], { useNativeDriver: false })(evt, gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 100) {
                    handleModalClose();
                } else {
                    Animated.spring(pan, { toValue: 0 }).start();
                }
            },
        })
    );
    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setCollaboratorsList([]);
        pan.setValue(0);
    };

    function AddCollaborator() {
        return (
            <TouchableOpacity style={styles.addCollaborator} onPress={handleModalOpen}>
                <Text style={styles.addCollaboratorText}>
                    {'Add Collaborator'}
                </Text>
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        console.warn(searchUser);
        async function handleSearch() {
            // Make axios request to /searchUsers using the searchUser string as the body
            // Set the response to a state variable
            const response = await axios.get('https://photocode.app:8443/searchUsers', {
                params: {
                    username: searchUser
                }
            });
            
            // Check if user is already a member of the project
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < projectMembers.length; j++) {
                    if (response.data[i]._id == projectMembers[j]._id) {
                        console.warn(response.data[i]._id, projectMembers[j]._id)
                        response.data[i].connection = 'Member';
                        console.log("Found Repeat");
                    }
                }
            }
            setCollaboratorsList(response.data);
        }
        handleSearch(searchUser);
    }, [searchUser]);

    useEffect(() => {
        _retrieveData = async () => {
            try {
                const projectId = await AsyncStorage.getItem('project_id');
                if (projectId !== null) {
                    await setProject_id(projectId);
                    getCollaborators(projectId);
                }
            } catch (error) {
                // Error retrieving data
                console.warn(error);
            }
        };
        async function getCollaborators(projectId) {
            console.warn(projectId);
            // Grab the collaborators already part of the project
            const projectMembers = await axios.get('https://photocode.app:8443/getCollaborators', {
                params: {
                    project_id: projectId
                }
            });
            setProjectMembers(projectMembers.data);
        }
        _retrieveData();
    }, []);

        // Function to handle adding a collaborator to a project
    const handleInviteCollaborator = async(user) => {
        // Update project information;
        console.warn(user);
        await axios.post(`https://photocode.app:8443/sendProjectInvite`, {
            email: user.email,
            project_id: project_id,
            project_name: projectName,
            user_id: user._id,
        })
        .then(() => {
            // setAddCollab(false)
            setResponseMessage("Successfully invited " + user.username + " to the project!");
            console.log("Successfully sent invite")
        })
        .catch((error) => {
            console.log("Error sending invite");
            setErrorMessage("Error sending invite");
        });
    }

    return (
        <View style={styles.SearchCollaboratorsContainer}>
            <AddCollaborator />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
                >
             <View style={styles.ModalContainer}>
                <Animated.View
                    style={{
                    transform: [
                        {
                        translateY: pan.interpolate({
                            inputRange: [0, 300],
                            outputRange: [0, -300],
                            extrapolate: 'clamp',
                        }),
                        },
                    ],
                    }}
                    {...panResponder.panHandlers}
                >
                        <View style={styles.modalContent}>
                            <View style={styles.searchArea}>
                                <Pressable onPress={() => {}} >
                                    <Image style={styles.searchImage} source={require('./../../assets/images/search.png')} />
                                </Pressable>
                                <TextInput
                                    style={styles.search}
                                    placeholder='Search Collaborators'
                                    placeholderTextColor='#5A5A5A' 
                                    onChangeText={(text) => setSearchUser(text)}
                                />
                            </View>
                            <ScrollView style={styles.collaboratorsList}>
                                {collaboratorsList.map((collaborator) => {
                                    return (
                                        <View style={styles.collaborator}>
                                            <View style={styles.collaboratorInfo}>
                                                <Image style={styles.profilePicture} source={{uri: collaborator.picture}} />
                                                <View style={styles.collaboratorNameConnection}>
                                                    <Text style={styles.collaboratorText}>{collaborator.username}</Text>
                                                    <Text style={styles.connectionText}>{collaborator.connection}</Text>
                                                </View>
                                            </View>
                                            {(collaborator.connection == 'Member') ? 
                                                    <TouchableOpacity disabled style={styles.addIndividualCollaboratorDisabled}>
                                                        <Text style={styles.addCollaboratorText}>Already Added</Text>
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity style={styles.addIndividualCollaborator} onPress={() => handleInviteCollaborator(collaborator)}>
                                                        <Text style={styles.addCollaboratorText}>Add</Text>
                                                    </TouchableOpacity>}
                                        </View>
                                    )
                                    })
                                }
                            {(responseMessage != '') ? <Text style={styles.responseMessage}>{responseMessage}</Text> : <></>}
                            {(errorMessage != '') ? <Text style={styles.errorMessage}>{errorMessage}</Text> : <></>}
                            </ScrollView>
                            <TouchableOpacity style={styles.exitModal} onPress={handleModalClose}>
                                <Text style={styles.exitModalText}>x</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    SearchCollaboratorsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalContainer: {
        // flex: 1,
        display: "flex",
        marginTop: "15%",
        height: "95%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 30,
    },
    modalContent: {
        height: "100%",
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCollaborator: {
        backgroundColor: 'green',
        borderRadius: 10,
        borderWidth: 3,
        padding: 10,
        marginVertical: 10,
    },
    addCollaboratorText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 24,
        color: 'white',
    },
    exitModal: {
        backgroundColor: 'grey',
        borderRadius: 1000,
        padding: 5,
        paddingHorizontal: 13,
        // marginVertical: 10,
        paddingBottom: 7,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        top: -10,
        right: 10,
    },
    exitModalText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 24,
        color: 'white',
    },
     searchArea: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        borderRadius: 10,
        width: windowWidth * 0.9,
        paddingVertical: 5,
        alignSelf: 'center',
        position: 'absolute',
        top: windowHeight * 0.05,
    },
    search: {
        width: windowWidth * 0.75,
        height: windowHeight * 0.05,
        fontSize: 23,
        textAlign: 'left',
        paddingLeft: 10,
        fontFamily: 'JetBrainsMono-Light',
        color: 'black',

    },
    searchImage: {
        width: 28,
        height: 27,
        marginLeft: 10,
    },
    collaboratorsList: {
        marginTop: windowHeight * 0.15,
    },
    collaborator: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingVertical: 5,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightgrey',
        marginVertical: 10,
    },    
    collaboratorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    collaboratorNameConnection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.6,
    },
    collaboratorText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 24,
    },
    connectionText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Light',
        fontSize: 15,
    },
    profilePicture: {
        width: 90,
        height: 90,
        margin: 10,
        borderRadius: 1000,
        // marginLeft: 10,
    },
    addIndividualCollaborator: {
        backgroundColor: '#1AC137',
        width: windowWidth * 0.8,
        borderRadius: 1000,
        padding: 5,
        paddingHorizontal: 13,
        marginVertical: 10,
        paddingBottom: 7,

    },
    addIndividualCollaboratorDisabled: {
        backgroundColor: '#74AD7E',
        width: windowWidth * 0.8,
        borderRadius: 1000,
        padding: 5,
        paddingHorizontal: 13,
        marginVertical: 10,
        paddingBottom: 7,
    },
    responseMessage: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 20,
        color: 'green',
    },
    errorMessage: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 20,
        color: 'red',
    },
});

export default SearchCollaborators;



