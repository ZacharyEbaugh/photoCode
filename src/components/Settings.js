import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
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

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <GoToButton screenName='HomeScreen' />
                    </View>
                    <View>
                        <Text style={styles.title}>
                            {'Settings'}
                        </Text>
                    </View>
                </View>

                <View style={styles.main}>

                </View>
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
        backgroundColor: '#FFFFFF',
        flex: 5,
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
});

export default App;
