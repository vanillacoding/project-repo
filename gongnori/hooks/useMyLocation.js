/**
 * @function it return current mobile's position on earth
 * @return {Array} - current mobile's location and geo code
 */

import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useMyLocation = () => {
  const [location, setLocation] = useState(null);
  const [geoCode, setGeoCode] = useState(null);

  useEffect(() => {
    const getGeoCode = async (location) => {
      const geoCode = await Location.reverseGeocodeAsync(location);
      setGeoCode({ geoCode });
    };

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") { throw new Error() }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;

      setLocation({ latitude, longitude });
      getGeoCode({ latitude, longitude });
    };

    getLocation();
  }, []);

  return [location, geoCode];
};

export default useMyLocation;
