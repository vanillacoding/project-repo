import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import generateSpatialHashGrid from "../utils/generateSpatialHashGrid";

/**
 * hook to deal with nearby messages in course
 * @param {object} region - of course
 * @param {array} messages - placed in course, must have latitude and longitude
 * @param {object} myLocation - from device gps, must have latitude and longitude
 * @returns nearby messages and indices of my location in spatial hash gird
 */
function useNearbyMsg(region, messages, myLocation) {
  const [myIndices, setMyIndices] = useState({});
  const spatialHashGrid = useMemo(() => generateSpatialHashGrid(region, messages), [region, messages]);
  const nearbyMessages = useMemo(getNearbyMessages, [spatialHashGrid, myIndices.x, myIndices.y]);

  function getNearbyMessages() {
    if (!spatialHashGrid || !myLocation) return;

    return spatialHashGrid.getWithNearbyByIndices(myIndices.x, myIndices.y);
  }

  useFocusEffect(useCallback(() => {
    if (!spatialHashGrid || !myLocation) return;

    const { latitude: myLat, longitude: myLng } = myLocation;
    const newMyIndices = spatialHashGrid.getIndices(myLat, myLng);

    if (!newMyIndices) return;

    setMyIndices(newMyIndices);
    return () => setMyIndices({});
  }, [spatialHashGrid, myLocation]));

  return { nearbyMessages, myIndices };
}

export default useNearbyMsg;
