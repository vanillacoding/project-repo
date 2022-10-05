export const mockPlants = [
  {
    _id: 'abc111',
    userId: '456abc',
    name: '쑥쑥이',
    species: '시금치',
    type: 'treePlant',
    growthStage: 3,
    isBlindUp: true,
    isSunPlant: true,
    penaltyPoints: 2,
    sunGuage: {
      defaultGuage: 5,
      currentGuage: 5,
    },
    waterGuage: {
      defaultGuage: 5,
      currentGuage: 2,
    },
    isDead: false,
  },
  {
    _id: '123akd',
    userId: '456ejf',
    name: '씩씩이',
    species: '튤립',
    type: 'defaultPlant',
    growthStage: 1,
    isBlindUp: false,
    isSunPlant: true,
    penaltyPoints: 0,
    sunGuage: {
      defaultGuage: 5,
      currentGuage: 1,
    },
    waterGuage: {
      defaultGuage: 5,
      currentGuage: 2,
    },
    isDead: false,
  },
];

export const mockPlant = {
  _id: 'abc111',
  userId: '456abc',
  name: '쑥쑥이',
  species: '시금치',
  type: 'treePlant',
  growthStage: 3,
  isBlindUp: true,
  isSunPlant: true,
  penaltyPoints: 2,
  sunGuage: {
    defaultGuage: 5,
    currentGuage: 5,
  },
  waterGuage: {
    defaultGuage: 5,
    currentGuage: 2,
  },
  isDead: false,
};

export const mockWeather = {
  weather: [{ main: 'mockWeatherName', icon: 'mockWeatherUrl' }],
  main: {
    temp: 100,
  },
};

export const mockPopularPlants = [
  '장미',
  '선인장',
  '튤립',
  '버드나무',
  '시금치',
];

export const mockPlantNameList = {
  data: [
    '장미허브 Vicks plant Plectranthus tomentosa',
    '리틀장미 Echeveria prolifica',
    '장미 Rose Rosa hybrida',
  ],
};

export const mockPlantInfo = {
  plantData: {
    englishName: 'Rose',
    isSunPlant: true,
    name: '장미',
    scientificName: 'Rosa hybrida',
    species: '장미과',
    watering: 3,
  },
};
