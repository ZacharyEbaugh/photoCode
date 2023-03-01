import { Modal, PanResponder, Animated, TextInput, TouchableOpacity, Pressable, View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LoginContext from './loginContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CreateProject extends React.Component {
    render() {
        return (
            <CreateProjectMain />
        );
    }
}


const CreateProjectMain = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const { user, userId, setUpdateProjects } = useContext(LoginContext);

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
        pan.setValue(0);
    };

    const handleProjectNameChange = (text) => {
        setProjectName(text);
    };

    const handleProjectDescriptionChange = (text) => {
        setProjectDescription(text);
    };

    const handleProjectCreation = () => {
        if (projectName === "" || projectDescription === "") {
            setResponseMessage("Please fill out all fields");
            return;
        }
        axios.post('https://photocode.app:8443/createProject', {
            name: projectName,
            description: projectDescription,
            user: userId,
        })
        .then((response) => {
            const project_id = response.data.project_id;
            // Create Folder that will act as the root folder for the project with a parent id of the project id
            axios.post('https://photocode.app:8443/createFolder', {
                name: projectName,
                parent_id: project_id,
            })
            .then(() => {
                setProjectName("");
                setProjectDescription("");
                handleModalClose();
                setUpdateProjects(true);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function CreateProjectButton() {
        return (
            <TouchableOpacity style={styles.addProjectButton} onPress={handleModalOpen}>
                <Text style={styles.addProjectText}>+</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.SearchCollaboratorsContainer}>
            <CreateProjectButton/>

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
                            <Image style={styles.modalClose} source={require('../../assets/images/siteIcon.png')} />
                            <View style={styles.section}>
                                <TextInput
                                    style={styles.newProjectName}
                                    placeholder={"Project Name"}
                                    placeholderTextColor={'grey'}
                                    value={projectName}
                                    onChangeText={(text) => setProjectName(text)}
                                />
                            </View>
                            <View style={styles.section}>
                                <TextInput
                                    editable
                                    style={styles.newProjectDescription}
                                    placeholder={"Project Description"}
                                    placeholderTextColor={'grey'}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={projectDescription}
                                    onChangeText={(text) => setProjectDescription(text)}
                                />
                            </View>
                            <View style={styles.section}>
                                <TouchableOpacity style={styles.createProject} onPress={() => handleProjectCreation()}>
                                    <Text style={styles.createProjectText}>Create Project</Text>
                                </TouchableOpacity>
                                {responseMessage !== "" ? <Text style={styles.responseMessage}>{responseMessage}</Text> : null}
                            </View>
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
        alignSelf: 'center',
        // flex: 1,
        display: "flex",
        marginTop: "35%",
        height: "50%",
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 30,
        borderWidth: 1,
        shadowColor: "#000",
        
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
     
    addProjectButton: {
        // position: 'absolute',
        // bottom: (windowHeight * 0.45),
        // right: (windowWidth - (windowWidth * 0.9)) * 0.5,
        marginBottom: 120,
        height: 75,
        width: windowWidth * 0.9,
        backgroundColor: '#00C853',
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addProjectText: {
        fontSize: 40,
        fontFamily: 'JetBrainsMono-Regular',
        color: 'white',
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
    createProject: {
        backgroundColor: '#00C853',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    createProjectText: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 24,
        color: 'white',
    },

    responseMessage: {
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 15,
        color: 'red',
    },
});

export default CreateProject;



