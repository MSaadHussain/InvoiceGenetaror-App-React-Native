// src/screens/ManageTemplatesScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For picking images (logo)
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const ManageTemplatesScreen = ({
  templates,
  setTemplates,
  setCurrentScreen,
  templateName,
  setTemplateName,
  companyName,
  setCompanyName,
  companyAddress,
  setCompanyAddress,
  companyPhoneNumber,
  setCompanyPhoneNumber,
  logoUri,
  setLogoUri,
  editingTemplateId,
  setEditingTemplateId,
  setSelectedTemplateId // Added for updating selected template after deletion
}) => {

  // Function to pick image for logo
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLogoUri(result.assets[0].uri);
    }
  };

  // Save or Update Template
  const handleSaveTemplate = () => {
    if (!templateName || !companyName || !companyAddress || !companyPhoneNumber) {
      Alert.alert("Missing Info", "Please fill in all template details.");
      return;
    }

    let updatedTemplates;
    if (editingTemplateId) {
      // Update existing template
      updatedTemplates = templates.map(t =>
        t.id === editingTemplateId
          ? {
              ...t,
              templateName,
              companyName,
              companyAddress,
              companyPhoneNumber,
              logoUri,
            }
          : t
      );
      setEditingTemplateId(null);
      Alert.alert("Success", "Template updated successfully!");
    } else {
      // Add new template
      const newTemplate = {
        id: Date.now().toString(), // Simple unique ID for AsyncStorage
        templateName,
        companyName,
        companyAddress,
        companyPhoneNumber,
        logoUri,
      };
      updatedTemplates = [...templates, newTemplate];
      Alert.alert("Success", "Template saved successfully!");
    }
    setTemplates(updatedTemplates);
    // Clear form
    setTemplateName('');
    setCompanyName('');
    setCompanyAddress('');
    setCompanyPhoneNumber('');
    setLogoUri(null);
  };

  // Edit Template
  const handleEditTemplate = (template) => {
    setEditingTemplateId(template.id);
    setTemplateName(template.templateName);
    setCompanyName(template.companyName);
    setCompanyAddress(template.companyAddress);
    setCompanyPhoneNumber(template.companyPhoneNumber);
    setLogoUri(template.logoUri);
    // setCurrentScreen('manageTemplates'); // Stay on this screen
  };

  // // Delete Template
  // const handleDeleteTemplate = (templateId) => {
  //   Alert.alert(
  //     "Confirm Deletion",
  //     "Are you sure you want to delete this template?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Delete",
  //         onPress: () => {
  //           const updatedTemplates = templates.filter(t => t.id !== templateId);
  //           setTemplates(updatedTemplates);
  //           Alert.alert("Success", "Template deleted successfully!");
  //           // If the deleted template was selected, clear selection
  //           // This is important to ensure a valid template is always selected for invoice generation
  //           setSelectedTemplateId(updatedTemplates.length > 0 ? updatedTemplates[0].id : null);
  //         }
  //       }
  //     ]
  //   );
  // };


  // Delete Template
  const handleDeleteTemplate = (templateId) => {
    console.log('handleDeleteTemplate called for ID:', templateId); // Debugging: Check if function is called

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this template?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log('Delete cancelled for ID:', templateId) // Debugging
        },
        {
          text: "Delete",
          onPress: () => {
            console.log('Confirmed delete for ID:', templateId); // Debugging: Check if delete is confirmed
            const updatedTemplates = templates.filter(t => t.id !== templateId);
            setTemplates(updatedTemplates);
            Alert.alert("Success", "Template deleted successfully!");
            console.log('Templates after deletion:', updatedTemplates.map(t => t.id)); // Debugging: Check new templates array

            // If the deleted template was selected, clear selection or select first available
            if (setSelectedTemplateId) { // Check if prop exists before calling
                if (updatedTemplates.length > 0) {
                    setSelectedTemplateId(updatedTemplates[0].id);
                    console.log('New selectedTemplateId:', updatedTemplates[0].id); // Debugging
                } else {
                    setSelectedTemplateId(null);
                    console.log('No templates left, selectedTemplateId set to null.'); // Debugging
                }
            } else {
                console.warn('setSelectedTemplateId prop is not available in ManageTemplatesScreen.'); // Debugging: Warn if prop is missing
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{editingTemplateId ? 'Edit Template' : 'Add New Template'}</Text>

      <TouchableOpacity style={styles.logoButton} onPress={pickImage}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logoPreview} />
        ) : (
          <Text style={styles.logoButtonText}>Select Company Logo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={templateName}
        onChangeText={setTemplateName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Address"
        value={companyAddress}
        onChangeText={setCompanyAddress}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Company Phone Number"
        value={companyPhoneNumber}
        onChangeText={setCompanyPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
        <Text style={styles.buttonText}>{editingTemplateId ? 'Update Template' : 'Save Template'}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Saved Templates</Text>
      {templates.length === 0 ? (
        <Text style={styles.noDataText}>No templates saved yet. Add one above!</Text>
      ) : (
        templates.map((template) => (
          <View key={template.id} style={styles.templateItem}>
            <Text style={styles.templateName}>{template.templateName || 'Unnamed Template'}</Text>
            <View style={styles.templateActions}>
              <TouchableOpacity onPress={() => handleEditTemplate(template)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTemplate(template.id)} style={[styles.actionButton, styles.deleteButton]}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => {
          setCurrentScreen('mainMenu');
          setEditingTemplateId(null); // Clear editing state when going back
          setTemplateName('');
          setCompanyName('');
          setCompanyAddress('');
          setCompanyPhoneNumber('');
          setLogoUri(null);
      }}>
        <Text style={styles.buttonText}>Back to Main Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ManageTemplatesScreen;
