import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Pressable, Text, Linking, Button, TouchableOpacity, Image, TextInput, Dimensions, Alert, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useNavigation } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {NativeModules} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const includeExtra = true;

function TakePhoto() {
    const [response, setResponse] = useState(null);
    const navigation = useNavigation();

    const onButtonPress = useCallback((type, options) => {
  
        if (type === 'capture') {
          launchCamera(options, setResponse);
        } else {
          launchImageLibrary(options, setResponse);
        }
        // ImagePicker.launchCamera(options, setResponse);
      }, []);

      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    key={'capture'}
                    onPress={() => onButtonPress('capture', {
                        saveToPhotos: true,
                        mediaType: 'photo',
                        includeBase64: false,
                        includeExtra,
                      })}>
                    <Text style={styles.buttonText}>
                        {'Take Photo'}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.line}/>

                  <TouchableOpacity
                    style={styles.button}
                    key={'library'}
                    onPress={() => onButtonPress('library', {
                        maxHeight: 200,
                        maxWidth: 200,
                        selectionLimit: 0,
                        mediaType: 'photo',
                        includeBase64: false,
                        includeExtra,
                      })}>
                    <Text style={styles.buttonText}>
                        {'Select Image'}
                    </Text>
                  </TouchableOpacity>

                  <View>
                    {response?.assets &&
                      response?.assets.map(({uri}) => (
                        NativeModules.TextRecognition.recognizeText(uri.substring(7), value => {
                          console.log("The result is: " + value);
                          // setImageText(value);
                          // setImageScanned(current => !current);
                          navigation.navigate('TextEditor', {
                            fileName: '',
                            initialText: JSON.stringify(value, null, 1).slice(1, -1).replaceAll(',', '').replaceAll('"', '').trim(),
                          });
                          setResponse(null);       
                        })
                      ))}
                  </View>


            </View>
        </SafeAreaView>
      );
}


export function CameraView() {
    const [response, setResponse] = useState(null);
    const [imageScanned, setImageScanned] = useState(false);
    const [imageText, setImageText] = useState(String);
  
    const onButtonPress = useCallback((type, options) => {
  
      if (type === 'capture') {
        launchCamera(options, setResponse);
        console.warn('capture');
      } else {
        launchImageLibrary(options, setResponse);
        NativeModules.TextRecognition.recognizeText(uri.substring(7), value => {
          console.log("The result is: " + value);
          // setImageText(value);
          // setImageScanned(current => !current);

        });
      }
      // ImagePicker.launchCamera(options, setResponse);
    }, []);
  
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.buttonContainer}>
            {actions.map(({title, type, options}) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  key={title}
                  onPress={() => onButtonPress(type, options)}>
                  <Text>
                      {title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <DemoResponse>{response}</DemoResponse>
  
          {response?.assets &&
            response?.assets.map(({uri}) => (
              <View key={uri} style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{width: 200, height: 200}}
                  source={{uri: uri}}
                />
                <TouchableOpacity
                onPress={() => NativeModules.TextRecognition.recognizeText(uri.substring(7), value => {
                  console.log("The result is: " + value);
                  setImageText(value);
                  setImageScanned(current => !current);
                })}
                >
              <Text>
                {"Recognize Text"}
              </Text>
            </TouchableOpacity>
              </View>
            ))}
  
          {imageScanned && 
              <Text>
                {imageText}
              </Text>
          }
  
         
        </ScrollView>
      </SafeAreaView>
    );
  }


class CameraOptions extends React.Component {
    // const navigation = useNavigation();

    state = {
        isPressed: false,
    };

    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={styles.sidebar}>
                <View style={styles.main}>
                    <TakePhoto />

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
                        <View style={styles.line}/>
                        <View>
                            <Text style={styles.buttonText}>
                                {"Cancel"}
                            </Text>
                        </View>

                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'aliceblue',
        alignItems: 'center',
        justifyContent: 'center',
      },
    line: {
        // flex: 1,
        height: 2,
        marginHorizontal: 10,
        backgroundColor: 'black',
    },
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
    button: {
        // flex: 1,
        width: windowWidth * 0.6,
    },
    buttonText: {
        fontSize: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
    },
    sidebar: {
        // flex: 1,
        backgroundColor: '#0066FF',
        height: windowHeight * 0.25,
        width: windowWidth * 0.6,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 3,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // alignSelf: 'center',
    },
});

export default CameraOptions;
