import React from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import { useNavigation } from '@react-navigation/native';

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

class App extends React.Component {

    state = {
        usernamePressed: false,
        exportPressed: false,
        deletePressed: false,
        syncPressed: false,
        lightPressed: false,
        darkPressed: false,
        applyPressed: false,
        darkTheme: false,
    };

    themeNames = ['Light Theme', 'Dark Theme'];
    themeIndex = 0;

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName='HomeScreen' />
                    </View>
                    <View>
                        <Text style={[styles.title, this.state.darkTheme && styles.darkThemeText]}>
                            {'Settings'}
                        </Text>
                    </View>
                </View>

                <View style={[styles.main, styles.lightTheme, this.state.darkTheme && styles.darkThemeMain]}>
                    <ScrollView>
                        <View style={styles.optionWrapper}>
                            <Text style={styles.sectionHeaders}>
                                {'Account'}
                            </Text>
                            <View style={styles.blackLine} />
                            <Pressable
                                style={[styles.optionButtons, this.state.usernamePressed && styles.opacity, this.state.darkTheme && styles.darkThemeButtons]}
                                onPress={() => {}}
                                onPressOut={() => {
                                    this.setState({usernamePressed: !this.state.usernamePressed})
                                }}
                                onPressIn={() => {
                                    this.setState({usernamePressed: !this.state.usernamePressed})
                                }}
                            >
                                <Text style={styles.optionText}>
                                    {'Change Username'}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[styles.optionButtons, this.state.exportPressed && styles.opacity, this.state.darkTheme && styles.darkThemeButtons]}
                                onPress={() => {}}
                                onPressOut={() => {
                                    this.setState({exportPressed: !this.state.exportPressed})
                                }}
                                onPressIn={() => {
                                    this.setState({exportPressed: !this.state.exportPressed})
                                }}
                            >
                                <Text style={styles.optionText}>
                                    {'Export User Data'}
                                </Text>

                            </Pressable>
                            <Pressable
                                style={[styles.optionButtons, this.state.deletePressed && styles.opacity, this.state.darkTheme && styles.darkThemeButtons]}
                                onPress={() => {}}
                                onPressOut={() => {
                                    this.setState({deletePressed: !this.state.deletePressed})
                                }}
                                onPressIn={() => {
                                    this.setState({deletePressed: !this.state.deletePressed})
                                }}
                            >
                                <Text style={styles.deleteText}>
                                    {'Delete Account'}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.optionWrapper}>
                            <Text style={styles.sectionHeaders}>
                                {'Appearance'}
                            </Text>
                            <View style={styles.blackLine} />
                            <Pressable
                                style={[styles.optionButtons, this.state.syncPressed && styles.opacity, this.state.darkTheme && styles.darkThemeButtons]}
                                onPress={() => {}}
                                onPressOut={() => {
                                    this.setState({syncPressed: !this.state.syncPressed})
                                }}
                                onPressIn={() => {
                                    this.setState({syncPressed: !this.state.syncPressed})
                                }}
                            >
                                <Text style={styles.optionText}>
                                    {'Sync with Account'}
                                </Text>
                            </Pressable>

                            <View style={[styles.themeWrapper, this.state.darkTheme && styles.darkThemeButtons]}>
                                <Text style={styles.themeText}>
                                    {this.themeNames[this.themeIndex]}
                                </Text>
                                <View style={styles.themeButtonWrapper}>
                                    <Pressable
                                        style={[this.state.lightPressed && styles.opacity]}
                                        onPress={() => {
                                            this.themeIndex = 0;
                                            this.setState({darkTheme: false})
                                        }}
                                        onPressOut={() => {
                                            this.setState({lightPressed: !this.state.lightPressed})
                                        }}
                                        onPressIn={() => {
                                            this.setState({lightPressed: !this.state.lightPressed})
                                        }}
                                    >
                                        <Image style={styles.themeButtons} source={require('../assets/images/Light_Mode.png')} />
                                    </Pressable>
                                    <Pressable
                                        style={[this.state.darkPressed && styles.opacity]}
                                        onPress={() => {
                                            this.themeIndex = 1;
                                            this.setState({darkTheme: true})
                                        }}
                                        onPressOut={() => {
                                            this.setState({darkPressed: !this.state.darkPressed})
                                        }}
                                        onPressIn={() => {
                                            this.setState({darkPressed: !this.state.darkPressed})
                                        }}
                                    >
                                        <Image style={styles.themeButtons} source={require('../assets/images/Dark_Mode.png')} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Shadow viewStyle={{alignSelf: 'stretch'}}>
                    <View style={[styles.apply, this.state.darkTheme && styles.darkThemeMain]}>
                        <Pressable
                            style={[styles.applyButton, this.state.applyPressed && styles.opacity]}
                            onPress={() => {}}
                            onPressOut={() => {
                                this.setState({applyPressed: !this.state.applyPressed})
                            }}
                            onPressIn={() => {
                                this.setState({applyPressed: !this.state.applyPressed})
                            }}
                        >
                            <Text style={[styles.applyText, this.state.darkTheme && styles.darkThemeText]}>
                                {'Apply'}
                            </Text>
                        </Pressable>
                    </View>
                </Shadow>
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
        // justifyContent: 'space-around',

    },
    main: {
        flex: 5,
    },
    lightTheme: {
        backgroundColor: '#FFFFFF',
    },
    darkThemeMain: {
        backgroundColor: '#414141',
    },
    darkThemeText: {
        color: 'black',
    },
    darkThemeButtons: {
        backgroundColor: '#A6A6A6',
    },
    title: {
        fontSize: 40,
        // marginTop: -100,
        textAlign: 'center',
        width: windowWidth,
        color: '#FFFFFF',
        // fontFamily: 'JetBrainsMono-Regular',
    },
    backButton: {
        marginTop: 40,
        marginLeft: 10,
    },
    backText: {
        fontSize: 20,
        color: '#FFFFFF',
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
    },
    deleteText: {
        textAlign: 'center',
        fontSize: 24,
        color: 'red',
        fontWeight: 'bold',
    },
    opacity: {
        opacity: 0.5,
    },
    themeWrapper: {
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 3,
    },
    themeText: {
        paddingLeft: 20,
        textAlign: 'left',
        fontSize: 25,
        marginBottom: 10,
        marginTop: 15,
    },
    themeButtonWrapper: {
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        paddingVertical: 20,
    },
    themeButtons: {
        height: 190,
        width: 100,
    },
    apply: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
    },
    applyButton: {
        alignSelf: 'center',
        width: windowWidth * 0.75,
        borderRadius: 10,
        borderWidth: 5,
        backgroundColor: '#0066FF',
    },
    applyText: {
        textAlign: 'center',
        fontSize: 50,
        color: 'white',
    },
});

export default App;
