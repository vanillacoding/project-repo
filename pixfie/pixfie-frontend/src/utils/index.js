import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/canvas';
import * as pixel from '../assets/faceCanvas';

export const loginAlert = navigation => {
  alert('로그인이 필요한 서비스입니다.');
  navigation.navigate('Login');
};

export const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

export const openCamera = async (loggedIn, setPhoto, navigation) => {

  if (!loggedIn.status) {
    alert('로그인이 필요한 서비스입니다');
    return navigation.navigate('Login');
  }

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.1
  });

  if (!result.cancelled) {
    setPhoto(result.uri);
    navigation.navigate('Ready');
  }
};

export const pickImage = async (loggedIn, setPhoto, navigation) => {

  if (!loggedIn.status) {
    alert('로그인이 필요한 서비스입니다');
    return navigation.navigate('Login');
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.1
  });

  if (!result.cancelled) {
    setPhoto(result.uri);
    navigation.navigate('Ready');
  }
};

export const generateFaceType = landmarks => {
  const faceType = {
    face: 0,
    eyebrows: 0,
    eyes: 0,
    nose: 0,
    lip: 0,
    hair: 0,
    clothes: 0,
    acc: 0,
    faceColor: '#FFDBAC',
    faceShadowColor: '#ee8862',
    eyebrowColor: '#000',
    eyeColor: '#000',
    lipColor: '#ee8862'
  };
  
  if (landmarks.facial_points.jaw[5][0] - landmarks.facial_points.jaw[2][0] > 0.05) {
    faceType.face = 0;
  } else {
    faceType.face = 1;
  }

  if (landmarks.facial_points.right_eyebrow[0][1] - landmarks.facial_points.right_eyebrow[2][1] < 0.02) {
    faceType.eyebrows = 0;
  } else if (landmarks.facial_points.right_eyebrow[0][1] < landmarks.facial_points.right_eyebrow[4][1]) {
    faceType.eyebrows = 1;
  } else if (landmarks.facial_points.right_eyebrow[0][1] > landmarks.facial_points.right_eyebrow[4][1]) {
    faceType.eyebrows = 2;
  }

  if (landmarks.facial_points.right_eye[0][1] < landmarks.facial_points.right_eye[3][1]) {
    faceType.eyes = 0;
  } else if (landmarks.facial_points.right_eye[0][1] > landmarks.facial_points.right_eye[3][1]) {
    faceType.eyes = 1;
  }

  if (landmarks.facial_points.nose[8][0] - landmarks.facial_points.nose[4][0] > 0.073) {
    faceType.nose = 0;
  } else {
    faceType.nose = 1;
  }

  if (landmarks.facial_points.lip[9][1] - landmarks.facial_points.lip[2][1] > 0.06) {
    faceType.lip = 0;
  } else if (landmarks.facial_points.lip[9][1] - landmarks.facial_points.lip[0][1] > 0.03) {
    faceType.lip = 1;
  } else {
    faceType.lip = 2;
  }

  return faceType;
};

export const handleCanvas = (canvas, faceType) => {
  if (canvas !== null) {

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext('2d');

    const imgObj = {
      name: 'face',
      colors: {
        face: faceType.faceColor,
        faceShadow: faceType.faceShadowColor,
        eyes: faceType.eyeColor,
        eyebrows: faceType.eyebrowColor,
        lip: faceType.lipColor,
        black: '#000',
        white: '#fff',
        gray: '#808080',
        D2D2D2: '#d2d2d2',
        darkBrown: '#23120b',
        lightBrown: '#855723',
        vacoBlue: '#62cfff',
      },
      layers: [
        ...pixel.face('face')[faceType.face],
        ...pixel.faceShadow('faceShadow')[faceType.face],
        ...pixel.eyebrows('eyebrows')[faceType.eyebrows],
        ...pixel.eyes('eyes'),
        ...pixel.eyeShadow('faceShadow')[faceType.eyes],
        ...pixel.nose('faceShadow')[faceType.nose],
        ...pixel.lip('lip')[faceType.lip],
        ...pixel.hair('black')[faceType.hair],
        ...pixel.clothes('D2D2D2')[faceType.clothes],
        ...pixel.acc('black')[faceType.acc],
      ]
    };

    function draw(img, x, y) {
      for (let i = 0; i < img.layers.length; i++) {
        const data = img.layers[i];
        const loc  = { x: (x||0) + data.x, y: (y||0) + data.y };

        ctx.fillStyle = img.colors[data.color];
        ctx.fillRect(loc.x, loc.y, data.width, data.height);
      }
    };
    
    draw(imgObj);
  }
};

export const carouselHandler = (direction, optionTheme, option) => {
  if (direction === 'left') {
    return !option ? optionTheme.options.length - 1 : option - 1;
  } else {
    return option === optionTheme.options.length - 1 ? 0 : option + 1;
  }
};
