// src/screens/InvoicePreviewScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const InvoicePreviewScreen = ({
  template,
  invoiceDetails,
  handleGeneratePdf,
  isGeneratingPdf,
  setCurrentScreen,
}) => {
  if (!template) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Template not found for preview.</Text>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => setCurrentScreen('generateInvoice')}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.invoiceContainer}>
      <View style={styles.invoiceHeader}>
        {template.logoUri ? (
          <Image source={{ uri: template.logoUri }} style={styles.invoiceLogo} />
        ) : (
          <Text style={styles.invoiceLogoPlaceholder}>[Your Logo]</Text>
        )}
        <Text style={styles.invoiceNumber}>Invoice # {invoiceDetails.invoiceNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleInvoice}>Your Business Information:</Text>
        <Text style={styles.invoiceText}>{template.templateName}</Text>
        <Text style={styles.invoiceText}>{template.companyName}</Text>
        <Text style={styles.invoiceText}>{template.companyAddress}</Text>
        <Text style={styles.invoiceText}>{template.companyPhoneNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleInvoice}>Client Information:</Text>
        <Text style={styles.invoiceText}>Client Name: {invoiceDetails.clientName}</Text>
        <Text style={styles.invoiceText}>Client Number: {invoiceDetails.clientNumber}</Text>
        <Text style={styles.invoiceText}>Client Email: {invoiceDetails.clientEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.invoiceText}>Project Name: {invoiceDetails.projectName}</Text>
        <Text style={styles.invoiceText}>Description: {invoiceDetails.projectDescription}</Text>
        <Text style={styles.invoiceText}>Price: ${parseFloat(invoiceDetails.projectPrice).toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.generatePdfButton]}
        onPress={handleGeneratePdf}
        disabled={isGeneratingPdf} // Disable button while PDF is generating
      >
        {isGeneratingPdf ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate PDF</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => setCurrentScreen('generateInvoice')}>
        <Text style={styles.buttonText}>Back to Invoice Generation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InvoicePreviewScreen;
