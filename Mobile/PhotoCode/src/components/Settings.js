import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { 
    View, 
    ScrollView,
    Pressable, 
    Text,
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Alert 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function BackButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(screenName)}
    >
        <Text style={styles.backText}>
            {'< Back'}
        </Text>
    </Pressable>
  );
}

// Hard Coded User Information 
id = '63bc7385c38907624d094eaa';

// API Setup
const baseUrl = "https://photocode.app:8443";
var userInfo; 

// Get User Info and store globally 
const getUserInfo = async () => {
    var userInfoResponse = await axios.post(baseUrl + '/getUserInfo', {
        user_id: id
    })
    userInfo = userInfoResponse.data;
}

const changeEmail = async (newEmail) => {
    var response = await axios.post(baseUrl + '/changeEmail', {
        user_id: id,
        newEmail: newEmail,
    });
    Alert.alert("Email Changed to " + newEmail);
}

const changeUsername = async (newUsername) => {
    var response = await axios.post(baseUrl + '/changeUsername', {
        user_id: id,
        newUsername: newUsername,
    });
    Alert.alert("Username Changed to " + newUsername);
}

const changePassword = async (newPassword) => {
    var response = await axios.post(baseUrl + '/resetPassword', {
        email: userEmail,
        password: newPassword,
        passwordConfirm: newPassword
    });
    Alert.alert("Password Changed to " + newPassword);
}

function Settings() {

    state = {
        newUsername: String,
        newEmail: String,
        newPassword: String,
    };

    useEffect(() => {
        getUserInfo()
    });

    const [emailPressed, setEmailPressed] = useState(false)
    const [usernamePressed, setUsernamePressed] = useState(false)
    const [passwordPressed, setPasswordPressed] = useState(false)
    const [deletePressed, setDeletePressed] = useState(false)

    const [showChangeEmail, setShowChangeEmail] = useState(false)
    const [showChangeUsername, setShowChangeUsername] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)

    const [confirmDisabled, setConfirmedDisabled] = useState(true)

    return (
        <View style={styles.container}>

            {/* Change Email Prompt */}
            {showChangeEmail && (
                <View style={[styles.changePrompt, {zIndex: 2}]}>    
                    <Text style={styles.changePromptHeader}>
                        {'Change Email'}
                    </Text>
                    <TextInput
                        style={styles.changePromptInput}
                        placeholder='New Email'
                        placeholderTextColor='darkgrey'
                        autoCapitalize='none'
                        onChangeText={(text) => {this.state.newEmail = text; setConfirmedDisabled(false); if(text == ""){setConfirmedDisabled(true)} }} 
                    />
                    <Pressable
                        style={[styles.changePromptConfirmButton, confirmDisabled && styles.disabled]}
                        disabled={confirmDisabled}
                        onPress={() => {setShowChangeEmail(!showChangeEmail); changeEmail(this.state.newEmail)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Confirm'}</Text>
                    </Pressable>

                    <Pressable
                        style={styles.changePromptCancelButton}
                        onPress={() => {setShowChangeEmail(!showChangeEmail); setConfirmedDisabled(true)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Cancel'}</Text>
                    </Pressable>
                </View>
            )}
            
            {/* Change Username Prompt */}
            {showChangeUsername && (
                <View style={[styles.changePrompt, {zIndex: 2}]}>    
                    <Text style={styles.changePromptHeader}>
                        {'Change Username'}
                    </Text>
                    <TextInput
                        style={styles.changePromptInput}
                        placeholder='New Username'
                        placeholderTextColor='darkgrey'
                        autoCapitalize='none'
                        onChangeText={(text) => {this.state.newUsername = text; setConfirmedDisabled(false); if(text == ""){setConfirmedDisabled(true)} }} 
                    />
                    <Pressable
                        style={[styles.changePromptConfirmButton, confirmDisabled && styles.disabled]}
                        disabled={confirmDisabled}
                        onPress={() => {setShowChangeUsername(false); changeUsername(this.state.newUsername)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Confirm'}</Text>
                    </Pressable>

                    <Pressable
                        style={styles.changePromptCancelButton}
                        onPress={() => {setShowChangeUsername(false); setConfirmedDisabled(true)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Cancel'}</Text>
                    </Pressable>
                </View>
            )}

            {/* Change Password Prompt */}
            {showChangePassword && (
                <View style={[styles.changePrompt, {zIndex: 2}]}>    
                    <Text style={styles.changePromptHeader}>
                        {'Change Password'}
                    </Text>
                    <TextInput
                        style={styles.changePromptInput}
                        placeholder='New Password'
                        placeholderTextColor='darkgrey'
                        autoCapitalize='none'
                        onChangeText={(text) => {this.state.newPassword = text; setConfirmedDisabled(false); if(text == ""){setConfirmedDisabled(true)} }} 
                    />
                    <Pressable
                        style={[styles.changePromptConfirmButton, confirmDisabled && styles.disabled]}
                        disabled={confirmDisabled}
                        onPress={() => {setShowChangePassword(!showChangePassword); changePassword(this.state.newPassword)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Confirm'}</Text>
                    </Pressable>

                    <Pressable
                        style={styles.changePromptCancelButton}
                        onPress={() => {setShowChangePassword(!showChangePassword);setConfirmedDisabled(true)}}
                    >
                    <Text style={styles.changePromptConfirmText}>{'Cancel'}</Text>
                    </Pressable>
                </View>
            )}

            <View style={styles.header}>
                <View style={styles.backButton}>
                    <BackButton screenName='HomeScreen' />
                </View>
                <View>
                    <Text style={[styles.title, this.state.darkTheme && styles.darkThemeText]}>
                        {'Settings'}
                    </Text>
                </View>
            </View>

            <View style={styles.main}>
                <ScrollView>
                    <View style={styles.optionWrapper}>
                        <Text style={styles.sectionHeaders}>
                            {'Account'}
                        </Text>

                        <View style={styles.blackLine} />

                        {/* Change Email Button */}
                        <Pressable
                            style={[styles.optionButtons, emailPressed && styles.opacity]}
                            onPress={() => {setShowChangeEmail(!showChangeEmail)}}
                            onPressOut={() => {
                                setEmailPressed(!emailPressed)
                            }}
                            onPressIn={() => {
                                setEmailPressed(!emailPressed)
                            }}
                        >
                            <Text style={styles.optionText}>
                                {'Change Email'}
                            </Text>
                        </Pressable>

                        {/* Change Username Button */}
                        <Pressable
                            style={[styles.optionButtons, usernamePressed && styles.opacity]}
                            onPress={() => {setShowChangeUsername(!showChangeEmail)}}
                            onPressOut={() => {
                                setUsernamePressed(!usernamePressed)
                            }}
                            onPressIn={() => {
                                setUsernamePressed(!usernamePressed)
                            }} 
                        >
                            <Text style={styles.optionText}>
                                {'Change Username'}
                            </Text>
                        </Pressable>

                        

                        {/* Change Password Button */}
                        <Pressable
                            style={[styles.optionButtons, passwordPressed && styles.opacity]}
                            onPress={() => {setShowChangePassword(!showChangePassword)}}
                            onPressOut={() => {
                                setPasswordPressed(!passwordPressed)
                            }}
                            onPressIn={() => {
                                setPasswordPressed(!passwordPressed)
                            }} 
                        >
                            <Text style={styles.optionText}>
                                {'Change Password'}
                            </Text>
                        </Pressable>
                            
                        {/* Delete Account Button */}
                        <Pressable
                            disabled={true}
                            style={[styles.optionButtons, deletePressed && styles.opacity, styles.disabled]}
                            onPress={() => {}}
                            onPressOut={() => {
                                setDeletePressed(!deletePressed)
                            }}
                            onPressIn={() => {
                                setDeletePressed(!deletePressed)
                            }}
                        >
                            <Text style={styles.deleteText}>
                                {'Delete Account'}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    changePrompt: {
        position: 'absolute',
        height: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
        top: windowHeight/2 - 100,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',        
    },
    changePromptHeader: {
        fontFamily: 'JetBrainsMono-Light',
        fontSize: 25,
        paddingHorizontal: 15,
        color: 'white',
        // paddingVertical: 10,
    },
    changePromptInput: {
        fontFamily: 'JetBrainsMono-Light',
        backgroundColor: 'white',
        fontSize: 20,
        marginHorizontal: 15,
        marginVertical: 20,
        borderRadius: 5,
        paddingVertical: 2,
        paddingLeft: 5,
        borderColor: 'black',
        borderWidth: 1,

    },
    changePromptConfirmButton: {
        backgroundColor: '#008000',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginHorizontal: 15,
        // marginVertical: 20,
    },
    changePromptCancelButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    changePromptConfirmText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'JetBrainsMono-Medium',
    },
    disabled: {
        opacity: 0.5,
    },
    header: {
        backgroundColor: '#0066FF',
        flex: 1.15,
    },
    main: {
        flex: 5,
    },
    title: {
        fontSize: 50,
        // marginTop: -100,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        marginTop: windowHeight * 0.004,
        fontFamily: 'JetBrainsMono-Bold',
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
    deleteText: {
        textAlign: 'center',
        fontSize: 24,
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Medium',
    },
    opacity: {
        opacity: 0.5,
    },
});

export default Settings;