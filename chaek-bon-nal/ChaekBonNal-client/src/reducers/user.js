import { RECEIVE_USER_DATA } from '../constants/index';

export const initialState = {
  imageUrl: '',
  email: '',
  name: '',
  choosenCategory: [],
  authorization: false
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return {
        ...state,
        imageUrl: action.userData.imageUrl,
        email: action.userData.email,
        name: action.userData.name,
        choosenCategory: [
          ...state.choosenCategory,
          action.userData.choosenCategory
        ],
        authorization: true
      };
    default:
      return state;
  }
};

