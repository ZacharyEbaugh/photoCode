Table of Contents: 
- [Project Setup Overview](#project-setup-overview)
  - [Install React Native](#install-react-native)
  - [Initialize Project](#initialize-project)
- [Update Podfile](#update-podfile)
- [Install Project Dependencies](#install-project-dependencies)
  - [React-Native-SVG](#react-native-svg)
  - [React-Native-Shadows](#react-native-shadows)
  - [React-Native-Navigation](#react-native-navigation)
  - [React-Native-Image-Picker](#react-native-image-picker)
  - [React-Native-Select-Dropdown](#react-native-select-dropdown)
  - [React-Native-Commmunity/Hooks](#react-native-commmunityhooks)
  - [React-Native-Code-Editor](#react-native-code-editor)
  - [Install React-Native-Firebase](#install-react-native-firebase)
- [Pod Install](#pod-install)
- [Final Build](#final-build)


# Project Setup Overview
&nbsp; &nbsp; Here is the walk-through of setting up the project on your machine. 

## Install React Native 

---
&nbsp; &nbsp; Follow the instructions at [reactnative.dev](https://reactnative.dev/docs/environment-setup) for setting up the environment for IOS. 

## Initialize Project

---
&nbsp; &nbsp; Run the following commands to create the project.  

    npx react-native init PhotoCode 
    npx react-native run-ios 



# Update Podfile
&nbsp; &nbsp; Once the project is initialized and the first build is complete update the podfile. 

  1. change IOS version to 15.0 
         
         platform :ios, '15.0'

   2. Add Google ML Kit pod for text recognition. Inside the "target 'PhotoCode' do" tag add: 
   
          # Google ML Text recognition 
          pod 'GoogleMLKit/TextRecognition', '3.2.0'

# Install Project Dependencies
&nbsp; &nbsp; The following dependencies are required to build and run the project.

## [React-Native-SVG](https://github.com/SrBrahma/react-native-shadow-2#readme)
    npm install react-native-svg

## [React-Native-Shadows](https://github.com/SrBrahma/react-native-shadow-2#readme)
    npm install react-native-shadow-2
 

## [React-Native-Navigation](https://reactnavigation.org/docs/getting-started)
    npm install @react-navigation/native
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/native-stack

## [React-Native-Image-Picker](https://github.com/react-native-image-picker/react-native-image-picker)
    1. npm i react-native-image-picker
    2. Update ios/PhotoCode/Info.plist
       a. Add following tags in outermost <dict> section
            <key>NSCameraUsageDescription</key>
            <string>$(PRODUCT_NAME) would like to use your camera</string>
            <key>NSMicrophoneUsageDescription</key>
            <string>$(PRODUCT_NAME) would like to your microphone (for videos)</string>
            <key>NSPhotoLibraryUsageDescription</key>
            <string>$(PRODUCT_NAME) would like access to your photo gallery</string>

## [React-Native-Select-Dropdown](https://github.com/AdelRedaa97/react-native-select-dropdown)
    npm install react-native-select-dropdown

## [React-Native-Commmunity/Hooks](https://github.com/react-native-community/hooks)
    npm install @react-native-community/hooks

## [React-Native-Code-Editor](https://github.com/RivasCVA/react-native-code-editor)
    npm install @rivascva/react-native-code-editor

## Install React-Native-Firebase
    npm install --save @react-native-firebase/app
    cd ios

    * add file to ios/PhotoCode.xcworkspace in Xcode * 
        1. Right click on 'PhotoCode' and click add file
        2. Check "Copy items if needed"
        3. Choose file "GoogleService-Info.plist"

    * do two updates in /ios/PhotoCode/AppDelegate.m in Xcode *
        * add header at top of file * 
            #import <Firebase.h>
        
        * update method "- (BOOL)application:(UIApplication *)application 
        didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {"
        add line to top of method *
            [FIRApp configure];

    *
        before pod install add these lines to ios/Podfile 
        in section "target 'PhotoCode' do" 
        after line "flags = get_default_flags()"
    *
        pod 'Firebase', :modular_headers => true
        pod 'FirebaseCore', :modular_headers => true
        pod 'GoogleUtilities', :modular_headers => true
        $RNFirebaseAsStaticFramework = true

    * enable flipper. Add line after "target 'PhotoCodeTests' do" ends* 
    use_flipper!()

    pod install
    // https://github.com/invertase/react-native-firebase
    // https://rnfirebase.io 

# Pod Install
&nbsp; &nbsp; After installing all of the dependencies run the following commands from the project root to install them for IOS:

    cd ios
    pod install
    cd ..

# Final Build 
&nbsp; &nbsp; Add the necessary files from the GitHub repository into the project root: 

  1. Add 'src' folder to in project folder
  2. Update index.js and add react-native-config.js to project folder
     1. Run the following command to install the fonts
   
            npx react-native-asset

  3. Add files in IOS folder to the IOS folder in the project folder
  4. Finally run the build command to build and run the project.
   
         npx react-native run-ios