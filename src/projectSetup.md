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
    Here is the walk-through of setting up the project on your machine. 

## Install React Native 
    Follow the instructions at [reactnative.dev](https://reactnative.dev/docs/environment-setup) for setting up the environment for IOS. 

## Initialize Project
    Run the following commands to create the project.  
        npx react-native init PhotoCode 
        npx react-native run-ios 



# Update Podfile
    Once the project is initialized and the first build is complete update the podfile. 
      1. change IOS version to 15.0 
         platform :ios, '15.0'

      2. Add Google ML Kit pod for text recognition. Inside the "target 'PhotoCode' do" tag add: 
         # Google ML Text recognition 
         pod 'GoogleMLKit/TextRecognition', '3.2.0'

# Install Project Dependencies
    The following dependencies are required to build and run the project.

## React-Native-SVG
    npm install react-native-svg
    [GitHub](https://github.com/SrBrahma/react-native-shadow-2#readme)

## React-Native-Shadows
    npm install react-native-svg
    [GitHub](https://github.com/SrBrahma/react-native-shadow-2#readme)

## React-Native-Navigation
    npm install @react-navigation/native
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/native-stack
    [reactnavigation.org](https://reactnavigation.org/docs/getting-started)

## React-Native-Image-Picker
    1. npm i react-native-image-picker
    2. Update ios/PhotoCode/Info.plist
       a. Add following tags in outermost <dict> section
            <key>NSCameraUsageDescription</key>
            <string>$(PRODUCT_NAME) would like to use your camera</string>
            <key>NSMicrophoneUsageDescription</key>
            string>$(PRODUCT_NAME) would like to your microphone (for videos)</string>
            <key>NSPhotoLibraryUsageDescription</key>
            <string>$(PRODUCT_NAME) would like access to your photo gallery</string>
    [GitHub](https://github.com/react-native-image-picker/react-native-image-picker)

## React-Native-Select-Dropdown
    npm install react-native-select-dropdown
    [GitHub](https://github.com/AdelRedaa97/react-native-select-dropdown)

## React-Native-Commmunity/Hooks
    npm install @react-native-community/hooks
    [GitHub](https://github.com/react-native-community/hooks)

## React-Native-Code-Editor
    npm install @rivascva/react-native-code-editor
    [GitHub](https://github.com/RivasCVA/react-native-code-editor)

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
    After installing all of the dependencies run the following commands from the project root to install them for IOS:
        cd ios
        pod install
        cd ..

# Final Build 
    Add the necessary files from the GitHub repository into the project root: 
        1. Add 'src' folder to in project folder
        2. Update index.js and add react-native-config.js to project folder
           a. run 'npx react-native-asset' to install fonts
        3. Add files in IOS folder to the IOS folder in the project folder
        4. Finally run 'npx react-native run-ios' to build and run the project.