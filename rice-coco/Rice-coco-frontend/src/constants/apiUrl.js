import getEnvVars from '../../environment';
import { DEFAULT_RADIUS } from '../constants/';
const { REACT_NATIVE_GOOGLE_PLACES_API_KEY } = getEnvVars();

export default API_URL = {
  randomNickname: 'https://nickname.hwanmoo.kr/?format=json&count=1',
  restaurantList: (latitude, longitude, searchWord) =>
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${DEFAULT_RADIUS}&type=restaurant&keyword=${searchWord}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`,
  restaurantDetails: restaurantId =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}&place_id=${restaurantId}&language=ko&fields=name,rating,adr_address,photo,geometry,reviews`,
  restaurantPhoto: photoReference =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`,
};
