// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local data storage

// Import Screens
import SplashScreen from './src/components/SplashScreen';
import MainMenuScreen from './src/components/MainMenuScreen';
import ManageTemplatesScreen from './src/screens/ManageTemplatesScreen';
import GenerateInvoiceScreen from './src/screens/GenerateInvoiceScreen';
import InvoicePreviewScreen from './src/screens/InvoicePreviewScreen';

// Import Utilities
import { loadTemplates as storageLoadTemplates, saveTemplates as storageSaveTemplates, TEMPLATES_STORAGE_KEY } from './src/utils/storage';
import { generatePdfHtml } from './src/utils/pdfGenerator'; // Import PDF HTML generator
import * as Print from 'expo-print'; // For PDF generation
import * as Sharing from 'expo-sharing'; // For sharing the generated PDF

const { height } = Dimensions.get('window'); // Keep Dimensions here if needed globally or pass down

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash', 'mainMenu', 'manageTemplates', 'generateInvoice', 'invoicePreview'
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isTemplatePickerVisible, setTemplatePickerVisible] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // States for Manage Templates (lifted here to be accessible by other screens for editing)
  const [templateName, setTemplateName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [logoUri, setLogoUri] = useState(null);
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  // States for Generate Invoice (lifted here for preview screen)
  const [clientName, setClientName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectPrice, setProjectPrice] = useState('');

  // Function to load templates from AsyncStorage
  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const parsedTemplates = await storageLoadTemplates();
      if (parsedTemplates) {
        setTemplates(parsedTemplates);
        if (parsedTemplates.length > 0) {
          setSelectedTemplateId(parsedTemplates[0].id); // Select first template by default
        }
      }
      setLoading(false);
      setCurrentScreen('mainMenu'); // Navigate to main menu after loading
    } catch (error) {
      console.error("Error loading templates from AsyncStorage:", error);
      Alert.alert("Error", "Failed to load saved templates.");
      setLoading(false);
      setCurrentScreen('mainMenu'); // Still go to main menu even if loading fails
    }
  }, []);

  // Function to save templates to AsyncStorage
  const saveTemplates = useCallback(async (currentTemplates) => {
    try {
      await storageSaveTemplates(currentTemplates);
      console.log("Templates saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving templates to AsyncStorage:", error);
      Alert.alert("Error", "Failed to save templates.");
    }
  }, []);

  // Initial load on app start (simulates splash screen)
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      loadTemplates();
    }, 2000); // 2 seconds splash

    return () => clearTimeout(splashTimer);
  }, [loadTemplates]);

  // Effect to save templates whenever the 'templates' state changes
  useEffect(() => {
    if (!loading) { // Only save after initial load is complete
      saveTemplates(templates);
    }
  }, [templates, loading, saveTemplates]);

  // Function to clear invoice fields
  const clearInvoiceFields = () => {
    setClientName('');
    setClientNumber('');
    setClientEmail('');
    setInvoiceNumber('');
    setProjectName('');
    setProjectDescription('');
    setProjectPrice('');
  };

  // Function to handle PDF generation
  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (!template) {
        Alert.alert("Error", "Selected template not found.");
        setIsGeneratingPdf(false);
        return;
      }

      const invoiceDetails = {
        clientName, clientNumber, clientEmail,
        invoiceNumber, projectName, projectDescription, projectPrice,
      };

      const htmlContent = generatePdfHtml(template, invoiceDetails);

      const { uri } = await Print.printToFileAsync({ html: htmlContent, base64: false });
      console.log('PDF generated at:', uri);

      if (uri) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert("Sharing Not Available", "PDF generated, but sharing is not available on this device.");
        }
      } else {
        Alert.alert("Error", "Failed to generate PDF file.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Render Screens based on currentScreen state
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'mainMenu':
      return (
        <MainMenuScreen
          setCurrentScreen={setCurrentScreen}
          templatesLength={templates.length}
          clearInvoiceFields={clearInvoiceFields}
        />
      );
    case 'manageTemplates':
      return (
        <ManageTemplatesScreen
          templates={templates}
          setTemplates={setTemplates}
          setCurrentScreen={setCurrentScreen}
          templateName={templateName}
          setTemplateName={setTemplateName}
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyAddress={companyAddress}
          setCompanyAddress={setCompanyAddress}
          companyPhoneNumber={companyPhoneNumber}
          setCompanyPhoneNumber={setCompanyPhoneNumber}
          logoUri={logoUri}
          setLogoUri={setLogoUri}
          editingTemplateId={editingTemplateId}
          setEditingTemplateId={setEditingTemplateId}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
        />
      );
    case 'generateInvoice':
      return (
        <GenerateInvoiceScreen
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
          isTemplatePickerVisible={isTemplatePickerVisible}
          setTemplatePickerVisible={setTemplatePickerVisible}
          clientName={clientName}
          setClientName={setClientName}
          clientNumber={clientNumber}
          setClientNumber={setClientNumber}
          clientEmail={clientEmail}
          setClientEmail={setClientEmail}
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          projectPrice={projectPrice}
          setProjectPrice={setProjectPrice}
          setCurrentScreen={setCurrentScreen}
        />
      );
    case 'invoicePreview':
      const currentTemplate = templates.find(t => t.id === selectedTemplateId);
      const invoiceDetails = {
        clientName, clientNumber, clientEmail,
        invoiceNumber, projectName, projectDescription, projectPrice,
      };
      return (
        <InvoicePreviewScreen
          template={currentTemplate}
          invoiceDetails={invoiceDetails}
          handleGeneratePdf={handleGeneratePdf}
          isGeneratingPdf={isGeneratingPdf}
          setCurrentScreen={setCurrentScreen}
        />
      );
    default:
      return (
        // Fallback for unknown screen
        <MainMenuScreen
          setCurrentScreen={setCurrentScreen}
          templatesLength={templates.length}
          clearInvoiceFields={clearInvoiceFields}
        />
      );
  }
};

export default App;
