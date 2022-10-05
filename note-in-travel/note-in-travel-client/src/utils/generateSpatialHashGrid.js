/**
 * factory function - generate 10 * 10 spatial hash grid
 * @param {object} region - of course
 * @param {array} items - to insert to grid
 * @returns grid having mothods
 */
function generateSpatialHashGrid(region = {}, items = []) {
  const result = Array.from({ length: 10 }).map(() => (
    Array.from({ length: 10 })
  ));
  const {
    latitude,
    latitudeDelta,
    longitude,
    longitudeDelta,
  } = region;

  if (!latitude || !latitudeDelta || !longitude || !longitudeDelta) return;

  const latOrigin = latitude - (latitudeDelta / 2);
  const lngOrigin = longitude - (longitudeDelta / 2);
  const dLat = latitudeDelta / 10;
  const dLng = longitudeDelta / 10;

  items.forEach((item) => {
    const { location, region: itemRegion } = item;
    const lat = location?.latitude ?? itemRegion.latitude;
    const lng = location?.longitude ?? itemRegion.longitude;

    const latIndex = Math.floor((lat - latOrigin) / dLat);
    const lngIndex = Math.floor((lng - lngOrigin) / dLng);

    if (latIndex < 0 || latIndex > 9) return;
    if (lngIndex < 0 || lngIndex > 9) return;

    const area = result[lngIndex][latIndex];

    result[lngIndex][latIndex] = area ? area.concat(item) : [item];
  });

  result.getIndices = (lat, lng) => {
    if (!lat || !lng) return;

    const latIndex = Math.floor((lat - latOrigin) / dLat);
    const lngIndex = Math.floor((lng - lngOrigin) / dLng);

    if (latIndex < 0 || latIndex > 9) return;
    if (lngIndex < 0 || lngIndex > 9) return;

    return { y: lngIndex, x: latIndex };
  };

  result.getByIndices = (x, y) => {
    if (x < 0 || x > 9) return;
    if (y < 0 || y > 9) return;

    return result[y][x];
  };

  result.getWithNearbyByIndices = (x, y) => {
    if (x < 0 || x > 9) return;
    if (y < 0 || y > 9) return;

    const minX = (x - 1 < 0) ? 0 : x - 1;
    const maxX = (x + 1 > 9) ? 9 : x + 1;
    const minY = (y - 1 < 0) ? 0 : y - 1;
    const maxY = (y + 1 > 9) ? 9 : y + 1;
    const combinedItems = [];

    for (let idxY = minY; idxY <= maxY; idxY++) {
      for (let idxX = minX; idxX <= maxX; idxX++) {
        if (result[idxY][idxX]) {
          combinedItems.push(...result[idxY][idxX]);
        }
      }
    }

    return combinedItems;
  };

  return result;
}

export default generateSpatialHashGrid;
