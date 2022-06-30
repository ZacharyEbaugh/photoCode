import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

import ActionButtons from './ActionButtons';
import Header from './Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class App extends React.Component {
    state = {
        active: false,
    };

    openMenu = () => {
        this.setState({active: !this.state.active});
        // console.warn(this.state.active);
    };

    render () {
        return (
                <View style={styles.container}>
                    <View style={{zIndex: 2}}>
                        {this.state.active && (
                            <Shadow distance={20}>
                                <View style={styles.sidebar}>
                                    <Pressable onPress={this.openMenu} style={styles.hamburgerMenu}>
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
                        )}
                    </View>
                    <View style={{zIndex: 1, position: 'absolute', height: windowHeight, alignSelf: 'center'}}>
                        <Header
                            onPress={this.openMenu}
                        />

                        <View style={styles.main}>
                            <Text style={styles.target}>
                                {'PhotoCode'}
                            </Text>
                        </View>
                        <ActionButtons />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // padding: 50,
        // <View style={{zIndex: 2}}>
        //     {this.state.active && (
        //         <Shadow>
        //             <View style={styles.sidebar}>
        //                 <Text>
        //                     {'Hi,\nUser'}
        //                 </Text>
        //                 <Text>
        //                     {'About Us\nContact Us\nSettings\nHelp\Logout'}
        //                 </Text>
        //             </View>
        //         </Shadow>
        //     )}
        // </View>
        flex: 1,
        // alignItems: 'center',
        // position: 'absolute',
    },
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
    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
    },
    target: {
        fontSize: 40,
        paddingTop: 50,
        // marginHorizontal: 50,
        // marginVertical: 50,
        textAlign: 'center',
        color: 'black',
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    // hamburgerMenu: {
    //     paddingTop: 30,
    //     marginLeft: 50,
    //     flex: 0.5,
    //     flexDirection: 'row',
    //     alignItems: 'flex-start',
    //     width: windowWidth,
    // },
});

export default App;
