import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

import ActionButtons from './ActionButtons';
import Header from './Header';
import SideBar from './SideBar';

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
                            <SideBar
                                onPress={this.openMenu}
                            />
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
});

export default App;
