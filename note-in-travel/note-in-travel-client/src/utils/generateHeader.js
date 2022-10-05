import * as SecureStore from "expo-secure-store";

/**
 * function to generate header for fetching to api server
 * @returns header object
 */
async function generateHeader() {
  const defaultHeader = { "Content-Type": "application/json" };

  const token = await SecureStore.getItemAsync("token");

  if (!token) {
    return defaultHeader;
  }

  return { ...defaultHeader, Authorization: `bearer ${token}` };
}

export default generateHeader;
