import calculateViewport from "./calcutateViewport";

/**
 * function to calculate center point of region list and view port with view padding
 * @param {array} regions - region list
 * @param {number} viewPadding - ratio of view padding to apply
 * @returns region object having latitude, latitudeDelta, longitude, longitudeDelta
 */
function calculateRegion(regions, viewPadding = 1.5) {
  let result = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  };
  let northeast = { latitude: 0, longitude: 0 };
  let southwest = { latitude: 0, longitude: 0 };

  regions.forEach((region, index) => {
    const { latitude, longitude } = region;

    if (index === 0) {
      result = { ...region };
      northeast = { latitude, longitude };
      southwest = { latitude, longitude };
      return;
    }

    northeast.latitude = Math.max(northeast.latitude, latitude);
    northeast.longitude = Math.max(northeast.longitude, longitude);
    southwest.latitude = Math.min(southwest.latitude, latitude);
    southwest.longitude = Math.min(southwest.longitude, longitude);
  });

  const { latitudeDelta, longitudeDelta } = calculateViewport(northeast, southwest);

  if (latitudeDelta > 0) {
    result.latitudeDelta = latitudeDelta;
  }

  if (longitudeDelta > 0) {
    result.longitudeDelta = longitudeDelta;
  }

  result.latitude = (northeast.latitude + southwest.latitude) / 2;
  result.longitude = (northeast.longitude + southwest.longitude) / 2;
  result.latitudeDelta *= viewPadding;
  result.longitudeDelta *= viewPadding;

  return result;
}

export default calculateRegion;
