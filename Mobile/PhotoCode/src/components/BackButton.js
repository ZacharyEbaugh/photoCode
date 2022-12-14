import React from "react";

import { View, Text, StyleSheet, Image, Dimensions, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

export function BackButton() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
        <Text style={styles.backText}>
            {'< Back'}
        </Text>
    </Pressable>

  );
}

const styles = StyleSheet.create({
    backButton: {
        marginTop: 40,
        marginLeft: 10,
    },
    backText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'JetBrainsMono-Medium',
    },
});