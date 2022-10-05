import { AsyncStorage } from 'react-native';

const saveToken = async (key, value, idKey, idValue) => {
  try {
    await AsyncStorage.setItem(key, value);
    await AsyncStorage.setItem(idKey, idValue);
  } catch(error) {
    
  }
};

export default saveToken;
