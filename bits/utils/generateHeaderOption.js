import * as SecureStore from 'expo-secure-store';

/**
 * Generate request headers with accessToken or default headers
 * @returns {Object} - request headers
 */

const generateHeaderOption = async () => {
  const defaultHeader = { 'Content-Type': 'application/json' };
  const accessToken = await SecureStore.getItemAsync('token');

  if (!accessToken) {
    return defaultHeader;
  }

  return {
    ...defaultHeader,
    'Authorization': `${accessToken}`
  };
};

export default generateHeaderOption;
