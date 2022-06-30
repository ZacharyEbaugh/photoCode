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

    render () {
        return (
                <Shadow distance={20}>
                    <View style={styles.sidebar}>
                        <Pressable onPress={this.props.onPress}>
                            <Image style={styles.searchImage} source={require('../assets/images/search.png')} />
                        </Pressable>
                        <Text>
                            {'Hi,\nUser'}
                        </Text>
                        <Text>
                            {'About Us\nContact Us\nSettings\nHelp\nLogout'}
                        </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderRightWidth: 3,
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});

export default SideBar;
