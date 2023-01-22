import React, {useEffect, useState} from 'react';
import { 
    View,
    Animated, 
    Pressable, 
    Text, 
    TouchableOpacity, 
    Image, 
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Easing 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SideBar from './sidebar/SideBar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function GoToSettings(picture) {
    const navigation = useNavigation()
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
            toValue: (windowWidth * 0.65),
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
        console.log('closing sidebar');
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

    logoutCloseSidebar = () => {
        animateCloseTopBar()
        animateCloseBottomBar()
    }

    return (
        <View style={[styles.header, {zIndex: 4}]}>
            <View style={[styles.topBar, {zIndex: 2}]}>
                <Animated.View style={[ { left: sideBarXPos}, {top: (windowHeight/1.55)}, {zIndex: 2}]}>
                    <SideBar onPress={this.logoutCloseSidebar} user={props.user} setUser={props.setUser} />
                </Animated.View>

                <Pressable
                    onPress={() => { sideBarController()}}
                    style={[styles.hamburgerMenu, {zIndex: 3}]}
                >
                    <Animated.View style={[styles.menuLine, {top: this.topBar}, {zIndex: 10}, {transform: [{rotate: topSpin}]}]}/>
                    <Animated.View style={[styles.menuLine, {top: this.bottomBar}, {zIndex: 10}, {transform: [{rotate: bottomSpin}]}]}/>
                </Pressable>

                <Text style={[styles.title, {zIndex: 1}]}>
                    {'PhotoCode'}
                </Text>
                <GoToSettings picture={props.user.picture} />
            </View>

            <View style={[styles.searchArea]}>
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

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0066FF',
        alignItems: 'center',
        height: windowHeight*0.2,
        paddingTop: windowHeight*0.05,
    },
    topBar: {
        // position: 'absolute',
        marginLeft: -windowWidth * 0.7,
        marginBottom: windowHeight*0.015,
        height: windowHeight*0.07,
        // borderWidth: 2,
        display: 'flex',
        // justifyContent: 'space-around',
        flexDirection: 'row',
        // width: windowWidth,
        // paddingBottom: windowHeight*0.025,
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
        marginHorizontal: windowWidth*0.09,
        // textAlign: 'center',
    },
    hamburgerMenu: {
        // alignItems: 'center',
        // justifyContent: 'center',
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
        width: windowWidth * 0.85,
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
