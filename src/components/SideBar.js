import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import { View, Pressable, Text, Image, Alert, Linking, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { Shadow } from 'react-native-shadow-2';


import { GoToSettings } from './SideBarButtonFunctions';
import { GoToAbout } from './SideBarButtonFunctions';
import { GoToContact } from './SideBarButtonFunctions';
import { GoToLogout } from './SideBarButtonFunctions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const zacGitHub = "https://github.com/ZacharyEbaugh";
const zacLinkedIn = "https://www.linkedin.com/in/zachary-ebaugh-1a3271224/";

const brandonGitHub = "https://github.com/brandonspangler2";
const brandonLinkedIn = "https://www.linkedin.com/in/brandon-spangler-0680291a0/";



const OpenURLButton = ({ url, children }) => {
    // States for opacity onpress
    const [isPressed, setIsPressed] = useState(false);

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
                style={[isPressed && styles.opacity]}
                onPress={handlePress}
                onPressIn={() => {
                    setIsPressed(current => !current);
                }}
                onPressOut={() => {
                    setIsPressed(current => !current);
                }}
            >
                {children}
            </Pressable>
        );
};


const showAlert = () =>
  Alert.alert(
    "Are you\nsure?",
    "",
    [
        {
            text: 'Logout',
            onPress: () => console.warn('logged out'),
        },
        {
            text: 'Cancel',
            onPress: () => console.warn('canceled'),
        },
    ],
  );


class SideBar extends React.Component {


    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };


    state = {
        aboutUs: false,
        contactUs: false,
        settings: false,
        help: false,
        logout: false,
        zleGitHub: false,
        zleLinkedIn: false,
        bssGitHub: false,
        bssLinkedIn: false,
    };


    render () {
        return (
                <Shadow distance={20}>
                    <View style={styles.sidebar}>
                        <View>
                            <Pressable onPress={this.props.onPress}>
                                <Image style={styles.searchImage} source={require('../assets/images/CrossButton.png')} />
                            </Pressable>
                        </View>
                        <View>
                            <Text style={styles.userDisplay}>
                                {'Hi,\nUser'}
                            </Text>
                        </View>
                        <View>
                            <GoToAbout/>
                            <GoToContact/>
                            <GoToSettings />
                            <Pressable
                                onPressOut={() => {
                                    this.setState({help: !this.state.help})
                                }}
                                onPressIn={() => {
                                    this.setState({help: !this.state.help})
                                }}
                                style={[styles.button, this.state.help && styles.updateBackground]}
                            >
                                <Text style={styles.options}>
                                    {'Help'}
                                </Text>
                            </Pressable>
                            <GoToLogout/>
                        </View>
                        <View>
                            <View style={styles.creatorInfo}>
                                <Text style={styles.creatorName}>
                                    {'zle'}
                                </Text>
                                <OpenURLButton url={zacGitHub} children={<Image
                                    style={styles.searchImage}
                                    source={require('./../assets/images/GitHub-Mark.png')}
                                    />}>
                                </OpenURLButton>
                                <OpenURLButton url={zacLinkedIn} children={<Image
                                    style={styles.searchImage}
                                    source={require('./../assets/images/linkedInLogo-Black.png')}
                                    />}>
                                </OpenURLButton>
                            </View>
                            <View style={styles.creatorInfo}>
                                <Text style={styles.creatorName}>
                                    {'bss'}
                                </Text>
                                <OpenURLButton url={brandonGitHub} children={<Image
                                    style={styles.searchImage}
                                    source={require('./../assets/images/GitHub-Mark.png')}
                                    />}>
                                </OpenURLButton>
                                <OpenURLButton url={brandonLinkedIn} children={<Image
                                    style={styles.searchImage}
                                    source={require('./../assets/images/linkedInLogo-Black.png')}
                                    />}>
                                </OpenURLButton>
                            </View>
                        </View>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../assets/images/photoCode-logo.png')} />
                        </View>
                    </View>
                </Shadow>
        );
    }
}

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#0066FF',
        height: windowHeight,
        width: windowWidth * 0.66,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        borderColor: 'black',
        borderRightWidth: 3,
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    userDisplay: {
        fontSize: 25,
        marginLeft: 20,
        color: 'white',
        marginBottom: 30,
    },
    button: {
        // backgroundColor: 'white',
        // marginLeft: 20,
        width: windowWidth * 0.66 - 3,
    },
    updateBackground: {
        backgroundColor: '#C2C2C2',
    },
    options: {
        marginLeft: 20,
        fontSize: 25,
    },
    creatorInfo: {
        flexDirection: 'row',
    },
    creatorName: {
        fontSize: 30,
        marginLeft: 20,
    },
    logoContainer: {
        alignItems: 'center',
        width: windowWidth * 0.66 - 3
    },
    logo: {
        height: 150,
        width: 150,
    },
    opacity: {
        opacity: 0.5,
    },
});

export default SideBar;
