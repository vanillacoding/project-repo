import { useState } from "react";

/**
 *
 * @param {Array} mapList Array containing map information
 * @returns A function to update to the next map if there is a next map
 */
const useNextMap = (mapList) => {
  const [currentMap, setCurrentMap] = useState(0);

  const getNextMap = () => {
    if (mapList[currentMap + 1]) {
      setCurrentMap(currentMap + 1);

      return;
    }

    setCurrentMap(0);
  };

  return [currentMap, getNextMap];
};

export default useNextMap;
