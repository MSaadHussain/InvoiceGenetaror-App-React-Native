// src/styles/appStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f6', // Lighter background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#eef2f6',
    width: '100%',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 50, // Add padding to bottom for scrollability
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#2c3e50', // Darker blue for splash
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 36, // Larger splash text
    fontWeight: 'bold',
    color: '#ecf0f1', // Lighter text
    letterSpacing: 2,
  },
  title: {
    fontSize: 30, // Slightly larger title
    fontWeight: 'bold',
    color: '#2c3e50', // Darker text
    marginBottom: 35, // More spacing
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 24, // Larger section titles
    fontWeight: '700', // Bolder
    color: '#34495e',
    marginTop: 30, // More spacing
    marginBottom: 18,
    alignSelf: 'flex-start',
    width: '100%',
    textAlign: 'center',
  },
  sectionTitleInvoice: {
    fontSize: 20, // Larger invoice section titles
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    color: '#34495e',
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 14, // More padding
    backgroundColor: '#ffffff',
    borderRadius: 12, // More rounded corners
    borderWidth: 1,
    borderColor: '#dcdcdc', // Lighter border
    marginBottom: 18, // More spacing
    fontSize: 16,
    color: '#34495e',
    shadowColor: '#000', // Subtle shadow for inputs
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: '90%',
    padding: 16, // More padding
    borderRadius: 12, // More rounded corners
    backgroundColor: '#3498db', // Primary blue
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, // Larger shadow
    shadowOpacity: 0.15, // More visible shadow
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19, // Larger text
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  backButton: {
    backgroundColor: '#7f8c8d', // Grey for back button
    marginTop: 35, // More spacing
  },
  generatePdfButton: {
    backgroundColor: '#e74c3c', // Red for PDF generation
    marginTop: 25,
  },
  logoButton: {
    width: 160, // Slightly larger logo button
    height: 160,
    borderRadius: 80, // Perfectly round
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    borderWidth: 3, // Thicker border
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    shadowColor: '#000', // Shadow for logo button
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  logoButtonText: {
    color: '#34495e',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  logoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  templateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 18, // More padding
    backgroundColor: '#ffffff',
    borderRadius: 12, // More rounded corners
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  templateName: {
    fontSize: 17,
    color: '#34495e',
    fontWeight: '600',
    flex: 1,
  },
  templateActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 12, // More spacing
    backgroundColor: '#28a745', // Darker green for edit
    shadowColor: '#000', // Shadow for action buttons
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Darker red for delete
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 17,
    color: '#7f8c8d',
    marginTop: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  customPickerButton: {
    width: '100%',
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  customPickerButtonText: {
    fontSize: 17,
    color: '#34495e',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20, // More rounded modal
    padding: 25, // More padding
    width: '85%', // Slightly wider modal
    maxHeight: height * 0.7, // Adjusted max height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Larger shadow
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalOption: {
    paddingVertical: 18, // More padding
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Lighter border
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 19, // Larger text
    color: '#34495e',
    fontWeight: '500',
  },
  modalCloseButton: {
    marginTop: 25, // More spacing
    padding: 14,
    backgroundColor: '#3498db',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  selectedTemplateInfo: {
    padding: 12,
    backgroundColor: '#e6f2ff', // Lighter blue background
    borderRadius: 10,
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
    borderLeftWidth: 5, // Accent border
    borderColor: '#3498db',
  },
  selectedTemplateText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3498db',
  },
  invoiceContainer: {
    backgroundColor: '#ffffff', // White background for invoice preview
    padding: 25, // More padding
    marginVertical: 25,
    borderRadius: 18, // More rounded
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    width: '95%',
    alignSelf: 'center',
  },
  invoiceHeader: {
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Lighter border
    paddingBottom: 20,
  },
  invoiceLogo: {
    width: 110, // Slightly larger logo
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#3498db', // Blue border for logo
  },
  invoiceLogoPlaceholder: {
    fontSize: 18,
    color: '#aaa', // Lighter placeholder text
    marginBottom: 15,
    fontStyle: 'italic',
  },
  invoiceNumber: {
    fontSize: 22, // Larger invoice number
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  section: {
    marginBottom: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Lighter section divider
  },
  invoiceText: {
    fontSize: 17,
    color: '#34495e',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 20,
    color: '#dc3545', // Darker red for errors
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '600',
  }
});
