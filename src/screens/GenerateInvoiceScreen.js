// src/screens/GenerateInvoiceScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CustomModal from '../components/CustomModal'; // Import the custom modal component
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const GenerateInvoiceScreen = ({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
  isTemplatePickerVisible,
  setTemplatePickerVisible,
  clientName,
  setClientName,
  clientNumber,
  setClientNumber,
  clientEmail,
  setClientEmail,
  invoiceNumber,
  setInvoiceNumber,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectPrice,
  setProjectPrice,
  setCurrentScreen,
}) => {
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Generate Invoice</Text>

      <Text style={styles.label}>Select Business Template:</Text>
      <TouchableOpacity
        style={styles.customPickerButton}
        onPress={() => setTemplatePickerVisible(true)}
      >
        <Text style={styles.customPickerButtonText}>
          {selectedTemplate ? selectedTemplate.templateName : 'Tap to Select Template'}
        </Text>
      </TouchableOpacity>

      {selectedTemplate && (
        <View style={styles.selectedTemplateInfo}>
          <Text style={styles.selectedTemplateText}>Using Template: {selectedTemplate.templateName}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Client Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Client's Name"
        value={clientName}
        onChangeText={setClientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Client's Number"
        value={clientNumber}
        onChangeText={setClientNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Client's Email"
        value={clientEmail}
        onChangeText={setClientEmail}
        keyboardType="email-address"
      />

      <Text style={styles.sectionTitle}>Invoice Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChangeText={setInvoiceNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <TextInput
        style={styles.input}
        placeholder="Project Description"
        value={projectDescription}
        onChangeText={setProjectDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Project Price"
        value={projectPrice}
        onChangeText={setProjectPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={() => {
        if (!selectedTemplateId) {
          Alert.alert("No Template Selected", "Please select a business template.");
          return;
        }
        if (!clientName || !invoiceNumber || !projectName || !projectPrice) {
          Alert.alert("Missing Info", "Please fill in Client Name, Invoice Number, Project Name, and Project Price.");
          return;
        }
        setCurrentScreen('invoicePreview');
      }}>
        <Text style={styles.buttonText}>Generate Invoice</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => setCurrentScreen('mainMenu')}>
        <Text style={styles.buttonText}>Back to Main Menu</Text>
      </TouchableOpacity>

      {/* Custom Template Picker Modal */}
      <CustomModal
        isVisible={isTemplatePickerVisible}
        onClose={() => setTemplatePickerVisible(false)}
        options={templates.map(t => ({ id: t.id, name: t.templateName }))}
        onSelect={setSelectedTemplateId}
        selectedId={selectedTemplateId}
        title="Select Invoice Template"
      />
    </ScrollView>
  );
};

export default GenerateInvoiceScreen;
