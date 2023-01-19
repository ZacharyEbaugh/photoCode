import { Modal, PanResponder, Animated, TextInput, TouchableOpacity, Pressable, View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateProject = () => {
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

    function CreateProjectButton() {
        return (
            <TouchableOpacity style={styles.addProjectButton} onPress={handleModalOpen}>
                <Text style={styles.addProjectText}>+</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.SearchCollaboratorsContainer}>
            <CreateProjectButton />

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
});

export default CreateProject;



