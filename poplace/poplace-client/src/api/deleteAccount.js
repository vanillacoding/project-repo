import axios from "axios";
import * as SecureStore from "expo-secure-store";
import getEnvVars from "../config/environment";
const { API_SERVER_URL } = getEnvVars();

import { ERROR } from "../constants";

export default async function deleteAccount(id) {
  try {
    const token = await SecureStore.getItemAsync("token");

    await axios.delete(`${API_SERVER_URL}/users/delete`, {
      data: { id },
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return { success: true };
  } catch (err) {
    alert(ERROR.cancelDeleteAccount);
  }
}
