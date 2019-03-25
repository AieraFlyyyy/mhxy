import { AsyncStorage } from 'react-native';
const setValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

const getValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      return;
    }
  } catch (error) {
    // Error retrieving data
  }
}

export default {
  setValue,
  getValue,
}