import getEnvVars from "../config/environment";
const { API_SERVER_URL } = getEnvVars();
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { ERROR } from "../constants";

export default async function fetchMyPins(userId, email) {
  try {
    const token = await SecureStore.getItemAsync("token");

    const response = await axios.get(`${API_SERVER_URL}/pins/${userId}`, {
      params: {
        email,
      },
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    if (response.data.code === 400) {
      alert(response.data.message);
      return;
    }

    const { myCreatedPins, mySavedPins } = response.data;

    return { myCreatedPins, mySavedPins };
  } catch (err) {
    alert(ERROR.server);
    return;
  }
}
