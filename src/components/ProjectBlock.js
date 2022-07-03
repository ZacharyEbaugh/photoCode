import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';

export function GoToProject({ imageSource, projectName, languageOne, languageTwo, languageThree, date }) {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate('ProjectFolder', { projectName });
            }}
        >
            <View style={styles.projectBlock}>
                <Shadow viewStyle={{alignSelf: 'stretch'}} radius={10}>
                    <View style={styles.projectContent}>
                        <Image style={styles.projectImage} source={imageSource} />

                        <View style={styles.textBlock}>
                            <Text style={styles.projectText}>
                                {projectName}
                            </Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <View style={styles.commonLanguage}>
                                <Text>
                                    {languageOne}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageOneColor]} />
                            </View>
                            <View style={styles.commonLanguage}>
                                <Text>
                                    {languageTwo}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageTwoColor]} />
                            </View>
                            <View style={styles.commonLanguage}>
                                <Text>
                                    {languageThree}
                                </Text>
                                 <View style={[styles.languageCircle, styles.languageThreeColor]} />
                            </View>
                            <View style={styles.date}>
                                <Text>
                                    {date}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Shadow>
            </View>
        </Pressable>
    );
}

// class ProjectBlock extends React.Component {
//
//     static propTypes = {
//         projectName: PropTypes.string.isRequired,
//         projectImageSource: PropTypes.number.isRequired,
//         languageOne: PropTypes.string.isRequired,
//         languageTwo: PropTypes.string.isRequired,
//         languageThree: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//     };
//
//     render () {
//         return (
//
//         );
//     }
// }

const styles = StyleSheet.create({
    projectBlock: {
        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginVertical: 10,
        // <View style={styles.projectContent}>
        //
        //     <Image style={styles.projectImage} source={this.props.projectImageSource} />
        //
        //     <View style={styles.textBlock}>
        //         <Text style={styles.projectText}>
        //             {this.props.projectName}
        //         </Text>
        //     </View>
        //     <View style={styles.infoBlock}>
        //         <View style={styles.commonLanguage}>
        //             <Text>
        //                 {this.props.languageOne}
        //             </Text>
        //              <View style={[styles.languageCircle, styles.languageOneColor]} />
        //         </View>
        //         <View style={styles.commonLanguage}>
        //             <Text>
        //                 {this.props.languageTwo}
        //             </Text>
        //              <View style={[styles.languageCircle, styles.languageTwoColor]} />
        //         </View>
        //         <View style={styles.commonLanguage}>
        //             <Text>
        //                 {this.props.languageThree}
        //             </Text>
        //              <View style={[styles.languageCircle, styles.languageThreeColor]} />
        //         </View>
        //         <View style={styles.date}>
        //             <Text>
        //                 {this.props.date}
        //             </Text>
        //         </View>
        //     </View>
        // </View>
    },
    projectContent: {
        flexDirection: 'row',
    },
    projectImage: {
        marginVertical: 10,
        marginHorizontal: 15,
        height: 75,
        width: 75,
    },
    textBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectText: {
        fontSize: 30,
    },
    infoBlock: {
        marginVertical: 10,
    },
    commonLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 1,
    },
    languageCircle: {
         width: 10,
         height: 10,
         borderRadius: 10 / 2,
         marginHorizontal: 5,
    },
    languageOneColor: {
         backgroundColor: '#FF5C00',
    },
    languageTwoColor: {
         backgroundColor: '#00D1FF',
    },
    languageThreeColor: {
         backgroundColor: '#FFE600',
    },
    date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1,
    },
});

// export default ProjectBlock;
