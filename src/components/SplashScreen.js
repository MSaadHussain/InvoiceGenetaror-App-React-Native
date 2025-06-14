// src/components/SplashScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Invoice Generator</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

export default SplashScreen;
