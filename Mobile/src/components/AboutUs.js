import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Button, Text, Image, Linking, Dimensions, StyleSheet, Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import HomeScreen from './HomeScreen';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const zacWebsite = "https://zacharyebaugh.com";
const zacGitHub = "https://github.com/ZacharyEbaugh";
const zacLinkedIn = "https://www.linkedin.com/in/zachary-ebaugh-1a3271224/";

const brandonWebsite = "https://brandonspangler.com";
const brandonGitHub = "https://github.com/brandonspangler2";
const brandonLinkedIn = "https://www.linkedin.com/in/brandon-spangler-0680291a0/";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (<Pressable 
                style={styles.linkButton}
                onPress={handlePress}>
                    {children}
                </Pressable>);
};


class ContactUs extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName={HomeScreen}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.title}>About Us</Text>
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.ProfileZac}>
                        <View style={styles.Profile}>
                            <Text style={styles.Name}>
                                Zachary{'\n'}
                                Licong{'\n'}
                                Ebaugh
                            </Text>
                            <Image
                                style={styles.profilePicture}
                                source={require('./../assets/images/zacProfilePic.jpg')}
                                />
                        </View>
                        <View style={styles.Links}>
                            <OpenURLButton url={zacWebsite} children={<Image
                                style={styles.websiteLinkButton}
                                source={require('./../assets/images/siteIcon.png')}
                            />}>
                            </OpenURLButton>
                            <OpenURLButton url={zacGitHub} children={<Image
                                style={styles.linkButton}
                                source={require('./../assets/images/GitHub-Mark.png')}
                            />}>
                            </OpenURLButton>
                            <OpenURLButton url={zacLinkedIn} children={<Image
                                style={styles.linkButton}
                                source={require('./../assets/images/linkedInLogo-Black.png')}
                            />}>
                            </OpenURLButton>
                        </View>
                    </View>
                    <View style={styles.ProfileBrandon}>
                        <View style={styles.Profile}>
                            <Text style={styles.Name}>
                                Brandon{'\n'}
                                Stephen{'\n'}
                                Spangler
                            </Text>
                            <Image
                                style={styles.profilePicture}
                                source={require('./../assets/images/brandonProfilePic.png')}
                            />
                        </View>
                        <View style={styles.Links}>
                            <OpenURLButton url={brandonWebsite} children={<Image
                                style={styles.websiteLinkButton}
                                source={require('./../assets/images/siteIcon.png')}
                            />}>
                            </OpenURLButton>
                            <OpenURLButton url={brandonGitHub} children={<Image
                                style={styles.linkButton}
                                source={require('./../assets/images/GitHub-Mark.png')}
                            />}>
                            </OpenURLButton>
                            <OpenURLButton url={brandonLinkedIn} children={<Image
                                style={styles.linkButton}
                                source={require('./../assets/images/linkedInLogo-Black.png')}
                            />}>
                            </OpenURLButton>
                        </View>
                    </View>
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
        flex: 1,
    },

    backButton: {
        marginTop: 40,
        marginLeft: 10,
    },
    backText: {
        fontSize: 20,
        color: '#FFFFFF',
    },

    title: {
        fontSize: 40,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
    },

    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
    },

    Profile: {
        flexDirection: 'row',
        marginTop: windowHeight * 0.03,
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Name: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    profilePicture: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.4,
        borderRadius: windowHeight,
        borderWidth: 3,
        marginLeft: 30,
    },

    Links: {
        width: windowWidth,
        height: windowHeight * 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "black",
    },

    linkButton: {
        color: 'black',
        padding: 20,
    },

    websiteLinkButton: {
        height: windowHeight * 0.09,
        width: windowWidth * 0.27
    }


});

export default ContactUs;
