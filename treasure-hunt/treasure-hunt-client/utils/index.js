import message from '../constants/message';

export const caculateLocation = (latitude, longitude, screen) => {
  const aspectRatio = screen.width / screen.height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * aspectRatio;
  return { latitude, longitude, latitudeDelta, longitudeDelta };
};

export const checkValidation = (category, country, name, description, uriList, markedLocation) => {
  if (!category) {
    alert(message.noneCategory);
    return false;
  } else if (!country) {
    alert(message.noneCountry);
    return false;
  } else if (!name) {
    alert(message.noneName);
    return false;
  } else if (!description) {
    alert(message.noneDescription);
    return false;
  } else if (!uriList.length) {
    alert(message.nonePictures);
    return false;
  } else if (!markedLocation) {
    alert(message.noneMap);
    return false;
  }
  return true;
};

export const makeExpirationToString = (timestamp) => {
  const year = new Date(timestamp).getFullYear();
  const month = new Date(timestamp).getMonth() + 1;
  const date = new Date(timestamp).getDate();
  return `${year}/${month}/${date}`;
};

export const makeCountryFlag = (country) => {
  return `https://img.icons8.com/color/48/000000/${country.toLowerCase()}-circular.png`;
};
