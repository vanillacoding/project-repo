exports.getAreasQuery = async function getAreasQuery(dataSources) {
  const area = await dataSources.areas.getAreas();

  return area;
};

exports.myAreaQuery = async function myAreaQuery({ lat, lng }, dataSources) {
  const geoIntersectQuery = {
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: 0,
      },
    },
  };

  let area = await dataSources.areas.getAreaByQuery(geoIntersectQuery);

  if (!area) {
    const response = await dataSources.kakaoAPI.getRegions({ lat, lng });

    if (!response || !response.documents || response.documents.length === 0) {
      return null;
    }

    const region = response.documents[0];
    const name = region.region_3depth_name || region.region_2depth_name || region.region_1depth_name;
    const location = {
      type: "Point",
      coordinates: [region.x, region.y],
    };

    area = { name, location };
  }

  return area;
};
