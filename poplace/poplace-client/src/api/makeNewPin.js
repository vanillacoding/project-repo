import * as Location from "expo-location";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import getEnvVars from "../config/environment";
const { API_SERVER_URL } = getEnvVars();

import { ERROR } from "../constants";

export default async function makeNewPin({ tags, photo, text, id }) {
  try {
    const currentLocation = await Location.getCurrentPositionAsync({});
    const data = new FormData();
    const {
      coords: { longitude, latitude },
    } = currentLocation;

    const stringifiedTags = JSON.stringify(tags.tagsArray);
    const stringifiedCoords = JSON.stringify([longitude, latitude]);

    data.append("photo", photo);
    data.append("text", text);
    data.append("creator", id);
    data.append("tags", stringifiedTags);
    data.append("coords", stringifiedCoords);

    const token = await SecureStore.getItemAsync("token");

    const response = await axios.post(
      `${API_SERVER_URL}/pins`, data, {
      text,
      creator: id,
      tags: stringifiedTags,
      coords: stringifiedCoords,
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    if (response.data.code === 400) {
      alert(response.data.message);
      return;
    }

    return { success: true };
  } catch (err) {
    alert(ERROR.cancelNewPin);
  }
}
