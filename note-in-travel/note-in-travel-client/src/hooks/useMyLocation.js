import { useCallback, useState } from "react";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

import MAP from "../constants/map";

/**
 * hook to deal with my location got from device gps
 * @param {boolean} isActive - turn on and off tracking my location
 * @param {object} options - of location to apply
 * @param {object|null} setStates - to handle error message
 * @returns my location got from device gps
 */
function useMyLocation(isActive, options = MAP.location.watchOptions, { setErrorMsg } = {}) {
  const [myLocation, setMyLocation] = useState(null);

  useFocusEffect(useCallback(() => {
    if (!isActive) return;

    let watchId;

    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg && setErrorMsg("Permission to access location was denied.");
        return;
      }

      watchId = await Location.watchPositionAsync(
        options,
        ({ coords: { latitude, longitude } }) => setMyLocation({ latitude, longitude }),
      );
    })();

    return () => {
      watchId.remove();
      setMyLocation(null);
    };
  }, [isActive, options]));

  return myLocation;
}

export default useMyLocation;
