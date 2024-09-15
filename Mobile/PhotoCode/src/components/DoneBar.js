import React from 'react';
import PropTypes from 'prop-types';

import {    
    View, 
    Text,
    Dimensions, 
    StyleSheet, 
    Pressable,
    Keyboard,
    InputAccessoryView
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class DoneBar extends React.Component {
    static propTypes = {
        inputId: String.isRequired,
    }

    render() {
        return (
            <InputAccessoryView nativeID={this.props.inputId}>
                <View style={styles.doneBar}> 
                    <Pressable onPress={() => {Keyboard.dismiss()}}>
                        <Text style={styles.doneBarText}>{'Done'}</Text>
                    </Pressable>
                </View>
            </InputAccessoryView>
        );
    }
};

const styles = StyleSheet.create({
    doneBar: {
        // display: 'flex',
        // width: windowWidth,
        backgroundColor: 'darkgrey',
        marginRight: 20,
        opacity: 0.75
    },
    doneBarText: {
        // backgroundColor: 'white',
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 20,
        textAlign: 'right',
        marginRight: 20,
        marginVertical: 10,
        color: 'black',

    },
});

export default DoneBar;

