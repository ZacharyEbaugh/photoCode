import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet, Easing } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';

import SideBar from './sidebar/SideBar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function GoToSettings(picture) {
    const navigation = useNavigation()
    // console.log(picture)
    return (
        <Pressable
            onPress={() => {navigation.navigate('Settings');}}
        >
            <Image style={styles.profilePicture} source={{uri: picture.picture}} />
        </Pressable>
    )
    
}

sideBarXPos = new Animated.Value(-windowWidth);
topBar = new Animated.Value(0);
topBarSpin = new Animated.Value(0);
bottomBar = new Animated.Value(0);
bottomBarSpin = new Animated.Value(0);

function Header(props) {
    const [sideBarActive, setSideBarActive] = useState(false);

    animateSideBarOpen = () => {
        Animated.timing(sideBarXPos, {
            toValue: -(windowWidth * 0.3)/2,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };
    animateSideBarClose = () => {
        Animated.timing(sideBarXPos, {
            toValue: -windowWidth,
            duration: 150,
            // easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => {
            setSideBarActive(!sideBarActive);
        });
    };

    openSidebar = () => {
        setSideBarActive(!sideBarActive);
        animateSideBarOpen();
    };

    closeSidebar = () => {
        animateSideBarClose();
    };

    animateOpenTopBar = () => {
        Animated.timing(this.topBar, {
            toValue: 4.5,
            duration: 200,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            openSidebar()
            Animated.timing(this.topBarSpin, {
                toValue: 1,
                duration: 200,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start(() => {
                
            });
        });
    };

    animateOpenBottomBar = () => {
        Animated.timing(this.bottomBar, {
            toValue: -4.5,
            duration: 200,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(this.bottomBarSpin, {
                toValue: 1,
                duration: 200,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start(() => {
                // openSidebar()
            });
        });
    };


    animateCloseTopBar = () => {
        Animated.timing(this.topBarSpin, {
            toValue: 0,
            duration: 200,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            closeSidebar()
            Animated.timing(this.topBar, {
                toValue: 0,
                duration: 200,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start(() => {
                
            })
        });
    };

    animateCloseBottomBar = () => {
        Animated.timing(this.bottomBarSpin, {
            toValue: 0,
            duration: 200,
            // easing: Easing.inertia,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(this.bottomBar, {
                toValue: 0,
                duration: 200,
                // easing: Easing.inertia,
                useNativeDriver: false,
            }).start()
        });
    };

    const topSpin = this.topBarSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    });

    const bottomSpin = this.bottomBarSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-45deg']
    });


    function sideBarController() {
        if (!sideBarActive) {
            // animateOpenTopBarSpin();
            animateOpenTopBar();
            animateOpenBottomBar();
            
        } else {
            animateCloseTopBar()
            animateCloseBottomBar()
        }
    }

    return (
        <View style={[styles.header, {zIndex: 4}]}>
        <View style={[styles.topBar, {zIndex: 4}]}>
            <Pressable
                onPress={() => { sideBarController()}}
                style={styles.hamburgerMenu}
            >
                <Animated.View style={[styles.menuLine, {top: this.topBar}, {zIndex: 10}, {transform: [{rotate: topSpin}]}]}/>
                <Animated.View style={[styles.menuLine, {top: this.bottomBar}, {zIndex: 10}, {transform: [{rotate: bottomSpin}]}]}/>
                {/* <Image style={styles.hamburgerMenuButton} source={require('../assets/images/MenuButton.png')} /> */}
            </Pressable>

            <Text style={[styles.title, sideBarActive && {opacity: 0}]}>
                {'PhotoCode'}
            </Text>
            <GoToSettings picture={props.user.picture} />
        </View>


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

        <Animated.View style={[{zIndex: 3}, { left: sideBarXPos}, {top: (-windowHeight*0.2)}]}>
            
                <SideBar onPress={closeSidebar} user={props.user} setUser={props.setUser} />
           
        </Animated.View>

    </View>

    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0066FF',
        alignItems: 'center',
        height: windowHeight*0.2,
        paddingTop: windowHeight*0.05,
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: windowWidth,
        paddingBottom: windowHeight*0.025,
        alignItems: 'center',
    },
    menuLine: {
        backgroundColor: 'white',
        marginBottom: 5,
        height: 4,
        width: 30,
        borderRadius: 2,
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'JetBrainsMono-Medium',
    },
    hamburgerMenu: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    searchArea: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 5,
        height: windowHeight*0.05,
        width: windowWidth * 0.75,
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
        resizeMode: 'contain',
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
});

export default Header;
