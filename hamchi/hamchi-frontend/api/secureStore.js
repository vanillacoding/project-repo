import * as SecureStore from 'expo-secure-store';

export const rememberCredentials = async (credentials) => {
  try {
    await SecureStore.setItemAsync(
      'userCredentials',
      JSON.stringify(credentials)
    );
  } catch (err) {
    console.log(err);
  }
};

export const readCredentials = async () => {
  try {
    const credentials = await SecureStore.getItemAsync('userCredentials');

    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      return parsedCredentials;
    }
  } catch (err) {
    console.log(err);
  }
};

export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync('userCredentials');
  } catch (err) {
    console.log(err);
  }
};
