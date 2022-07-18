import React from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Button, Linking, TouchableOpacity, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import ActionButtons from './ActionButtons';
import Header from './Header';
import SideBar from './SideBar';
import { GoToProject } from './ProjectBlock';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var userName = 'Brandon';

var PROJECT_INFO= [
  {
    title: 'Portfolio Website',
    imageFile: require('../assets/images/siteIcon.png'),
    languageOne: 'HTML',
    languageTwo: 'CSS',
    languageThree: 'JavaScript',
    date: '5/27/2022',
  },
  {
    title: 'SkipList Visual',
    imageFile: require('../assets/images/skipList-Icon.png'),
    languageOne: 'Java',
    languageTwo: 'JavaScript',
    languageThree: 'Shell',
    date: '10/22/2021',
  },
];

class HomeScreen extends React.Component {

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
                            {PROJECT_INFO.map((project, i) => (
                                <GoToProject
                                    key={i}
                                    imageSource={project.imageFile}
                                    projectName={project.title}
                                    languageOne={project.languageOne}
                                    languageTwo={project.languageTwo}
                                    languageThree={project.languageThree}
                                    date={project.date}
                                />
                            ))}
                        </View>
                        <ActionButtons />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        backgroundColor: '#FFFFFF',
        flex: 5,
        // {PROJECT_IMAGES.map((project, i) => (
        //     <ProjectBlock
        //         key={i}
        //         projectName={project.title}
        //         projectImageSource={project.file}
        //         languageOne={project.languageOne}
        //         languageTwo={project.languageTwo}
        //         languageThree={project.languageThree}
        //         date={project.date}
        //     />
        // ))}
        // <ProjectBlock
        //     key={i}
        //     projectName={project.title}
        //     projectImageSource={project.file}
        //     languageOne={project.languageOne}
        //     languageTwo={project.languageTwo}
        //     languageThree={project.languageThree}
        //     date={project.date}
        // />
    },
    target: {
        fontSize: 40,
        paddingTop: 50,
        textAlign: 'center',
        color: 'black',
    },
    projectBlock: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginVertical: 10,
         // overflow: 'hidden',
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
         backgroundColor: '#00C853',
         marginHorizontal: 5,
    },
    date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1,
    },
});

export default HomeScreen;
