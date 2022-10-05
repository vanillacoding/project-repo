import {
  takeLatest,
  put,
  all,
  call,
} from "redux-saga/effects";

import history from "../utils/history";
import * as actions from "../reducers/user";
import { profileType } from "../constants";
import api from "../api";

function* editProfile({ payload }) {
  const {
    type,
    name,
    file,
    _id,
  } = payload;
  let response;
  let data;

  try {
    if (type === profileType.name) {
      response = yield call(api.editUserProfileName, { name, _id });
    }

    if (type === profileType.photo) {
      response = yield call(api.uploadUserProflePhoto, { file, _id });
    }

    data = {
      type,
      data: response.payload,
    };

    yield put(actions.editProfileSuccess(data));
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

function* chooseGenre({ payload }) {
  try {
    const response = yield call(api.editUserLikeGenre, payload);

    if (!response.result) {
      yield put(actions.requestFailure("error"));

      return;
    }

    yield put(actions.chooseGenreSuccess(response.genres));
    history.push("/");
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

function* likeMusic({ payload }) {
  try {
    const { music } = yield call(api.updateLikeMusic, payload);

    yield put(actions.musicLikeSuccess({ musicId: music._id, createdAt: music.createdAt }));
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* dislikeMusic({ payload }) {
  try {
    const { music } = yield call(api.updateLikeMusic, payload);

    yield put(actions.musicDislikeSuccess({ musicId: music._id }));
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* watchEditProfile() {
  yield takeLatest(actions.editProfileRequest.type, editProfile);
}

function* watchChooseGenre() {
  yield takeLatest(actions.chooseGenreRequest.type, chooseGenre);
}

function* watchMusicLike() {
  yield takeLatest(actions.musicLikeRequest.type, likeMusic);
}

function* watchMusicDislike() {
  yield takeLatest(actions.musicDislikeRequest.type, dislikeMusic);
}

export default function* userProfileSagas() {
  yield all([
    call(watchEditProfile),
    call(watchChooseGenre),
    call(watchMusicLike),
    call(watchMusicDislike),
  ]);
}
