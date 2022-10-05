/**
 * @function it pick image on mobile and uploads image to AWS S3
 * @params {String} defaultImage - default image's url
 * @return {Array} - image state and image pick function
 */

import { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import fetchServer from "../utils/fetchServer";
import * as device from "../constants/device";

const usePickImage = (defaultImage) => {
  const [image, setImage] = useState(defaultImage);
  const [imageS3, setImageS3] = useState(defaultImage);

  useEffect(() => {
    (async () => {
      if (device.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          return;
        }
      }
    })();
  }, []);

  const pickImage = useCallback(async () => {
    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const uri = pickResult.uri;
    const fileName = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    formData.append("image", {
      uri,
      name: fileName,
      type,
    });

    if (!pickResult.cancelled) {
      setImage(pickResult.uri);

      const res = await fetchServer("POST", "team/emblem", formData, true);
      setImageS3(res.data);
    }
  }, []);

  return [image, imageS3, pickImage];
};

export default usePickImage;
