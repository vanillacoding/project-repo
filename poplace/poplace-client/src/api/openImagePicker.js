import * as ImagePicker from "expo-image-picker";

import { ERROR } from "../constants";

export default async function openImagePicker() {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert(ERROR.cameraAccess);

    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (pickerResult.uri) {
    return pickerResult.uri;
  }

  return false;
}
