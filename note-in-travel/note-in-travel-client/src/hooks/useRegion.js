import { useState } from "react";

import calculateRegion from "../utils/calculateRegion";

/**
 * hook to deal with region and region list
 * @param {object|array} regions - one region object or region list
 * @param {number} viewPadding - ratio of view padding to apply
 * @returns region object having latitude, latitudeDelta, longitude, longitudeDelta
 */
function useRegion(regions = {}, viewPadding) {
  const [region, setRegion] = useState(() => verifyRegion(regions, viewPadding));

  function changeRegion(sites, changedViewPadding) {
    const verified = verifyRegion(sites, changedViewPadding);

    setRegion(verified);
  }

  function verifyRegion(rowRegions, rowViewPadding) {
    return Array.isArray(rowRegions)
      ? calculateRegion(rowRegions, rowViewPadding)
      : rowRegions;
  }

  return { region, changeRegion };
}

export default useRegion;
