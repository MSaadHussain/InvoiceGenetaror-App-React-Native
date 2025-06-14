// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TEMPLATES_STORAGE_KEY = 'invoiceTemplates';

/**
 * Loads templates from AsyncStorage.
 * @returns {Promise<Array>} A promise that resolves to an array of templates, or null if an error occurs.
 */
export const loadTemplates = async () => {
  try {
    const storedTemplates = await AsyncStorage.getItem(TEMPLATES_STORAGE_KEY);
    return storedTemplates ? JSON.parse(storedTemplates) : [];
  } catch (error) {
    console.error("Error loading templates from AsyncStorage:", error);
    return null;
  }
};

/**
 * Saves templates to AsyncStorage.
 * @param {Array} templates - The array of templates to save.
 * @returns {Promise<void>} A promise that resolves when the templates are saved.
 */
export const saveTemplates = async (templates) => {
  try {
    await AsyncStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error("Error saving templates to AsyncStorage:", error);
  }
};
