const Photo = require('../models/Photo');

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  const R = 6371;
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = deg2rad(lng2-lng1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;

  return d;
}

const PhotoService = {
  getPhotoByLocation: async (latitude, longitude) => {
    const findResult = await Photo.find();

    const filteredResult = findResult.filter(el => (getDistanceFromLatLonInKm(latitude, longitude, el.location[0], el.location[1]) < 3));

    return filteredResult;
  }
};

module.exports = PhotoService;
