/**
 * function to calculate delta and comblne with location informations
 * @param {object} northeast - top-right lacation having lat, lng keys
 * @param {object} southwest - bottom-left lacation having lat, lng keys
 * @returns delta object
 */
function calculateViewport(northeast, southwest) {
  const maxLat = northeast.lat ?? northeast.latitude;
  const maxLng = northeast.lng ?? northeast.longitude;
  const minLat = southwest.lat ?? southwest.latitude;
  const minLng = southwest.lng ?? southwest.longitude;

  const latitudeDelta = Math.abs(maxLat - minLat);
  const longitudeDelta = Math.abs(maxLng - minLng);

  return {
    latitudeDelta,
    longitudeDelta,
  };
}

export default calculateViewport;
