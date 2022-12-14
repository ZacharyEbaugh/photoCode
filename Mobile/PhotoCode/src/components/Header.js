import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Easing } from 'react-native';
import { Shadow } from 'react-native-shadow-2';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class Header extends React.Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render () {
        return (
            <View style={styles.header}>
                <Pressable
                    onPress={this.props.onPress}
                    style={styles.hamburgerMenu}
                >
                    <Image style={styles.hamburgerMenuButton} source={require('../assets/images/MenuButton.png')} />
                </Pressable>

                <Text style={styles.title}>
                    {'PhotoCode'}
                </Text>


                <View style={styles.searchArea}>
                    <TouchableOpacity onPress={() => {}}>
                        <Image style={styles.searchImage} source={require('../assets/images/search.png')} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.search}
                        placeholder='Search Projects'
                        placeholderTextColor='darkgrey' 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0066FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 40,
        marginTop: -100,
        textAlign: 'center',
        color: 'white',
        width: windowWidth,
        fontFamily: 'JetBrainsMono-Medium',
    },
    hamburgerMenu: {
        paddingTop: 30,
        marginLeft: 50,
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: windowWidth,
    },
    searchArea: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 5,
    },
    search: {
        width: windowWidth * 0.75,
        height: 40,
        fontSize: 25,
        textAlign: 'left',
        paddingLeft: 10,
        fontFamily: 'JetBrainsMono-Regular',
    },
    hamburgerMenuButton: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    searchImage: {
        width: 30,
        // backgroundColor: 'black',
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
});

export default Header;
