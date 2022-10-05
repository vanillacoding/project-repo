import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  email: '',
  name: '',
  bestSleepHours: 0,
  bestBedtime: 0,
  bestWakeUpTime: 0,
  myDiaries: {},
  sleepLastUpdatedAt: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        bestSleepHours: action.payload.bestSleepHours,
        bestBedtime: action.payload.bestBedtime,
        bestWakeUpTime: action.payload.bestWakeUpTime,
        myDiaries: action.payload.myDiaries,
        sleepLastUpdatedAt: action.payload.sleepLastUpdatedAt
      };
    default: return state;
  }
};

export default user;
