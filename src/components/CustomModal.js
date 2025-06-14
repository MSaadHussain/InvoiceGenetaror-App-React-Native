// src/components/CustomModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { appStyles as styles } from '../styles/appStyles'; // Import styles

const { height } = Dimensions.get('window'); // Keep Dimensions here for modal height

const CustomModal = ({
  isVisible,
  onClose,
  options,
  onSelect,
  selectedId,
  title = "Select Option"
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose} // Dismiss modal on overlay press
      >
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.modalOption,
                  selectedId === option.id && { backgroundColor: '#e6f2ff' } // Highlight selected option
                ]}
                onPress={() => {
                  onSelect(option.id);
                  onClose();
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedId === option.id && { fontWeight: 'bold', color: '#3498db' }
                ]}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
