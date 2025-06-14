// src/components/MainMenuScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const MainMenuScreen = ({ setCurrentScreen, templatesLength, clearInvoiceFields }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>
      <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('manageTemplates')}>
        <Text style={styles.buttonText}>Manage Templates</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        if (templatesLength === 0) {
          Alert.alert("No Templates", "Please create a business template first before generating an invoice.");
          return;
        }
        clearInvoiceFields(); // Clear fields when navigating to invoice generation
        setCurrentScreen('generateInvoice');
      }}>
        <Text style={styles.buttonText}>Generate Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainMenuScreen;
