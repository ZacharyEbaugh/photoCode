import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
    }

    render () {
        return (
                <Shadow distance={20}>
                    <View style={styles.sidebar}>
                        <View>
                            <Pressable onPress={this.props.onPress}>
                                <Image style={styles.searchImage} source={require('../assets/images/search.png')} />
                            </Pressable>
                        </View>
                        <View>
                            <Text style={styles.userDisplay}>
                                {'Hi,\nUser'}
                            </Text>
                        </View>
                        <View>
                            <Pressable
                                onPress={() => {
                                    this.setState({aboutUs: !this.state.aboutUs})
                                }}
                                onPressIn={() => {
                                    this.setState({aboutUs: !this.state.aboutUs})
                                }}
                                style={[styles.button, this.state.aboutUs && styles.updateBackground]}
                            >
                                <Text style={styles.options}>
                                    {'About Us'}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    this.setState({contactUs: !this.state.contactUs})
                                }}
                                onPressIn={() => {
                                    this.setState({contactUs: !this.state.contactUs})
                                }}
                                style={[styles.button, this.state.contactUs && styles.updateBackground]}
                            >
                                <Text style={styles.options}>
                                    {'Contact Us'}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    this.setState({settings: !this.state.settings})
                                }}
                                onPressIn={() => {
                                    this.setState({settings: !this.state.settings})
                                }}
                                style={[styles.button, this.state.settings && styles.updateBackground]}
                            >
                                <Text style={styles.options}>
                                    {'Settings'}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
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
                            <Pressable
                                onPress={() => {
                                    this.setState({logout: !this.state.logout})
                                }}
                                onPressIn={() => {
                                    this.setState({logout: !this.state.logout})
                                }}
                                style={[styles.button, this.state.logout && styles.updateBackground]}
                            >
                                <Text style={styles.options}>
                                    {'Logout'}
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                            <View style={styles.creatorInfo}>
                                <Text style={styles.creatorName}>
                                    {'zle'}
                                </Text>
                                <Pressable
                                    onPress={() => {}}
                                >
                                    <Image style={styles.searchImage} source={require('../assets/images/GitHub-Mark.png')} />
                                </Pressable>
                                <Pressable
                                    onPress={() => {}}
                                >
                                    <Image style={styles.searchImage} source={require('../assets/images/linkedInLogo-Black.png')} />
                                </Pressable>
                            </View>
                            <View style={styles.creatorInfo}>
                                <Text style={styles.creatorName}>
                                    {'bss'}
                                </Text>
                                <Pressable
                                    onPress={() => {}}
                                >
                                    <Image style={styles.searchImage} source={require('../assets/images/GitHub-Mark.png')} />
                                </Pressable>
                                <Pressable
                                    onPress={() => {}}
                                >
                                    <Image style={styles.searchImage} source={require('../assets/images/linkedInLogo-Black.png')} />
                                </Pressable>
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
});

export default SideBar;
