import { 
  LOG_IN_SUCCESS,
  LOG_IN_SUCCESS_USER,
  LOG_IN_SUCCESS_CAT,
  LOCATION_SUCCESS, 
  FETCH_CATS_DATA, 
  ADD_CAT_DATA, 
  CHOSEN_CAT, 
  UPDATE_CATS_DATA_LIKE,
  MODIFY_CAT_DATA,
  DELETE_CAT,
  UPDATE_CATS_DATA_COMMENT,
  ADD_COMMENT,
  GET_COMMENTS,
  REST_COMMENTS,
  DELETE_COMMENT,
  LOADING,
  LOG_OUT,
  GET_USER_LOCATION,
  UPDATE_CATS_DATA,
} from '../constants';

export const logInSuccessCat = (cats) => {
  return { type: LOG_IN_SUCCESS_CAT, cats };
};

export const logInSuccessUser = (user) => {
  return { type: LOG_IN_SUCCESS_USER, user };
};

export const logInSuccess = () => {
  return { type: LOG_IN_SUCCESS };
};

export const locationSuccess = (location) => {
  return { type: LOCATION_SUCCESS, location };
};

export const userLocation = (location) => {
  return { type: GET_USER_LOCATION, location };
};

export const catsData = (location) => {
  return { type: FETCH_CATS_DATA, location };
};

export const addAcat = (newCat) => {
  return { type: ADD_CAT_DATA, newCat };
};

export const clickedCat = (catIndex) => {
  return { type: CHOSEN_CAT, catIndex };
};

export const updateAcatForLike = (cat) => {
  return { type: UPDATE_CATS_DATA_LIKE, cat };
}

export const updateCatsData = (cats) => {
  return { type: UPDATE_CATS_DATA, cats };
};

export const modifyAcat = (cat) => {
  return { type: MODIFY_CAT_DATA, cat };
};

export const deleteAcat = (cat) => {
  return { type: DELETE_CAT, cat };
};

export const updateCatsComment = (cat) => {
  return { type: UPDATE_CATS_DATA_COMMENT, cat } ;
};

export const getComments = (comments) => {
  return { type: GET_COMMENTS, comments }
};

export const addAcomment = (comment) => {
  return { type: ADD_COMMENT, comment };
};

export const deleteAcomment = (comment) => {
  return { type: DELETE_COMMENT, comment };
};

export const resetCommnets = () => {
  return { type: REST_COMMENTS };
}

export const loading = () => {
  return { type: LOADING };
};

export const logOut = () => {
  return { type: LOG_OUT };
};
