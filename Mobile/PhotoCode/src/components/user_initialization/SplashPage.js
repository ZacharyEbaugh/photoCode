import React, { startTransition } from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { LoginButtons } from './LoginButtons';

class SplashPage extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.PText}>P</Text>
                <Text style={styles.TitleText}>PhotoCode</Text>
                <Text style={styles.SubTitleText}>Scan-in Repository</Text>
                <Text style={styles.CText}>C</Text>
                <LoginButtons style={styles.loginButtons}/>
            </View>
        );
    };
}

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
        fontSize: 700,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -1,
        elevation: -1,
        top: -200,
        left: -60,
        fontFamily: 'JetBrainsMono-Medium',
    },

    CText: {
        width: '130%',
        color: '#0049B8',
        fontWeight: 'bold',
        fontSize: 700,
        position: 'absolute',
        textAlign: 'left',
        alignSelf: 'flex-start',
        zIndex: -2,
        elevation: -2,
        top: 270,
        left: 60,
        fontFamily: 'JetBrainsMono-Medium',
        // backgroundColor: 'white',

    },

    TitleText: {
        color:'white',
        fontSize: 70,
        position: 'absolute',
        top: 190,
        left: -155,
        transform: [{ rotate: '90deg' }],
        fontFamily: 'JetBrainsMono-Medium',
    },

    SubTitleText: {
        color: 'white',
        fontSize: 45,
        top: 310,
        left: 95,
        fontFamily: 'JetBrainsMono-Medium',
    },

    loginButtons: {
        marginTop: 10,
    },

});

export default SplashPage;
