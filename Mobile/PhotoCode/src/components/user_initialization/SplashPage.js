import React, { startTransition, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './loginContext';

import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native';
import { LoginButtons } from './LoginButtons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SplashPage extends React.Component {
    render() {
        return (
           <SplashPageMain />
        );
    }
}


const SplashPageMain = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.PText}>P</Text>
            <Text style={styles.TitleText}>{'PhotoCode'}</Text>
            <Text style={styles.SubTitleText}>{'Scan-in\nRepository'}</Text>
            <Text style={styles.CText}>C</Text>
            <LoginButtons />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0066FF',
        flexDirection: 'column',
    },

    PText: {
        width: '130%',
        color: '#0049B8',
        fontWeight: 'bold',
        fontSize: windowWidth <= 390 ? 700 : 900,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -1,
        elevation: -1,
        top: windowWidth <= 390 ? -200 : -185,
        left: windowWidth <= 390 ? -60 : -60,
        fontFamily: 'JetBrainsMono-Medium',
    },

    CText: {
        width: '130%',
        color: '#0049B8',
        fontWeight: 'bold',
        fontSize: windowWidth <= 390 ? 700 : 900,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -2,
        elevation: -2,
        top: windowWidth <= 390 ? 270 : 300,
        left: 60,
        fontFamily: 'JetBrainsMono-Medium',
        // backgroundColor: 'white',

    },

    TitleText: {
        color:'white',
        fontSize: windowWidth <= 390 ? 70 : 80,
        position: 'absolute',
        top: 190,
        left: windowWidth <= 390 ? -160 : -145,
        transform: [{ rotate: '90deg' }],
        fontFamily: 'JetBrainsMono-Medium',
    },

    SubTitleText: {
        color: 'white',
        fontSize: windowWidth <= 390 ? 45 : 55,
        top: windowWidth <= 390 ? 310 : 335,
        left: windowWidth <= 390 ? 95 : 130,
        fontFamily: 'JetBrainsMono-Medium',
    },

    loginButtons: {
        marginTop: 10,
    },

});

export default SplashPage;
