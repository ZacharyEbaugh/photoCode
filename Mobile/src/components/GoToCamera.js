import React from 'react';
import PropTypes from 'prop-types';

import { Pressable, Image, StyleSheet } from 'react-native';


class GoToCamera extends React.Component {
    state = {
        isPressed: false,
    };

    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Pressable
                onPress={this.props.onPress}
                onPressOut={() => {
                    this.setState({isPressed: !this.state.isPressed})
                }}
                onPressIn={() => {
                    this.setState({isPressed: !this.state.isPressed})
                }}
                style={[styles.button, this.state.isPressed && styles.highlight]}
            >

                <Image
                    style={[styles.scanToTextImage]}
                    source={require('../assets/images/scan-to-text.png')}
                />

            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    scanToTextImage: {
        height: 100,
        width: 100,
    },
    newFileImage: {
        height: 75,
        width: 75,
    },
    highlight: {
        opacity: 0.5,
    },
});

export default GoToCamera;
