import axios from 'axios';
import {
  GET_ARTISTS_REQUEST,
  GET_ARTISTS_SUCCESS,
  GET_ARTISTS_FAILED,
  SELECT_FAVORITE_ARTIST,
  DESELECT_FAVORITE_ARTIST,
  SAVE_ARTISTS_REQUEST,
  SAVE_ARTISTS_SUCCESS,
  SAVE_ARTISTS_FAILED,
  CLEAR_POST_RESULT,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR
} from '../constants/index';

export const getArtists = dispatch => async userId => {
  dispatch({ type: GET_ARTISTS_REQUEST, userId });

  try {
    const { data: { artistList, favoriteArtists } } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/favorites`);

    const selectedArtists = {};
    favoriteArtists.forEach(artistId => selectedArtists[artistId] = true);

    dispatch({ type: GET_ARTISTS_SUCCESS, artistList, selectedArtists });
  } catch (err) {
    dispatch({ type: GET_ARTISTS_FAILED, error: err.response.data.errorMessage });
  }
};

export const selectArtist = dispatch => artistId => {
  dispatch({ type: SELECT_FAVORITE_ARTIST, artistId });
};

export const deselectArtist = dispatch => artistId => {
  dispatch({ type: DESELECT_FAVORITE_ARTIST, artistId });
};

export const saveFavoriteArtists = dispatch => async (userId, selectedArtists) => {
  dispatch({ type: SAVE_ARTISTS_REQUEST });

  try {
    await axios.post(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/favorites`, selectedArtists);
    dispatch({ type: SAVE_ARTISTS_SUCCESS });
  } catch (err) {
    dispatch({ type: SAVE_ARTISTS_FAILED, error: err.response.data.errorMessage });
  }
};

export const clearPostResult = dispatch => () => {
  dispatch({ type: CLEAR_POST_RESULT });
};

export const getProfile = dispatch => async userId => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data: userProfile } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/profile`, userId);
    dispatch({ type: GET_PROFILE_SUCCESS, userProfile });
  } catch (err) {
    dispatch({ type: GET_PROFILE_ERROR, error: err.response.data.errorMessage });
  }
};
