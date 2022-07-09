import React, { startTransition } from 'react';
import PropTypes from 'prop-types';

import LoginButtons from './LoginRegisterButtons';

import {View, Text, StyleSheet} from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

class SplashPage extends React.Component {

    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.PText}>P</Text>
                <Text style={styles.TitleText}>PhotoCode</Text>
                <Text style={styles.SubTitleText}>Scan-in Repository</Text>
                <Text style={styles.CText}>C</Text>
                <LoginButtons />

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
        // backgroundColor: 'white',

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
        // backgroundColor: 'white',

    },

    TitleText: {
        color:'white',
        fontSize: 70,
        position: 'absolute',
        top: 180,
        left: -130,
        transform: [{ rotate: '90deg' }],

    },

    SubTitleText: {
        color: 'white',
        fontSize: 50,
        top: 310,
        left: 95,
    }

});

export default SplashPage;