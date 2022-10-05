import firebase from "../configs/firebase";

import {
  socialType,
  photoLikeType,
  sampleUserRange,
} from "../constants";
import makeArrayToQuery from "../utils/makeArrayQuery";

const url = process.env.REACT_APP_SERVER_URL;

const loginLocal = async user => {
  try {
    const response = await fetch(`${url}/auth/login/local`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const loginSocial = async user => {
  try {
    const response = await fetch(`${url}/auth/login/social`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const loginRefresh = async user => {
  const { _id, token } = user;
  try {
    const response = await fetch(`${url}/auth/login/refresh/${_id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const loginSocialByType = async type => {
  let provider = null;

  try {
    if (type === socialType.google) provider = new firebase.auth.GoogleAuthProvider();
    if (type === socialType.facebook) provider = new firebase.auth.FacebookAuthProvider();

    const { user } = await firebase.auth().signInWithPopup(provider);

    const userInfo = { name: user.displayName, email: user.email };

    return userInfo;
  } catch (error) {
    return error;
  }
};

const signup = async user => {
  try {
    const response = await fetch(`${url}/auth/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const logout = async ({ _id, token }) => {
  try {
    const response = await fetch(`${url}/auth/logout/${_id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const editUserProfileName = async ({ name, _id }) => {
  const { token } = JSON.parse(localStorage.user);

  try {
    const response = await fetch(`${url}/users/profile/name/${_id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const uploadUserProflePhoto = async ({ file }) => {
  const { _id, token } = JSON.parse(localStorage.user);

  try {
    const response = await fetch(`${url}/users/profile/photo/${_id}`, {
      method: "PATCH",
      headers: {
        "authorization": token,
      },
      body: file,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const uploadMusicCoverPhoto = async ({ file }) => {
  const { token } = JSON.parse(localStorage.user);

  try {
    const response = await fetch(`${url}/musics/cover-photo`, {
      method: "PATCH",
      headers: {
        "authorization": token,
      },
      body: file,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const createMusic = async music => {
  try {
    const response = await fetch(`${url}/musics`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ music }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getGenre = async () => {
  try {
    const response = await fetch(`${url}/genres`);

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getArtist = async artists => {
  const { _id, token } = JSON.parse(localStorage.user);

  const query = makeArrayToQuery({
    type: "_id",
    key: "artistId",
    data: artists,
  });

  try {
    const response = await fetch(`${url}/artists/by-specific/${_id}/?${query}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const editUserLikeGenre = async genres => {
  const { _id, token } = JSON.parse(localStorage.user);

  try {
    const response = await fetch(`${url}/users/profile/likeGenre/${_id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: JSON.stringify({ genres }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const updateLikeMusic = async ({ isLike, musicId }) => {
  const { _id, token } = JSON.parse(localStorage.user);

  const type = isLike ? photoLikeType.like : photoLikeType.disLike;

  try {
    const response = await fetch(`${url}/users/profile/likeMusic/${_id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: JSON.stringify({ type, musicId }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getMusicByLikeGenre = async genres => {
  const { _id, token } = JSON.parse(localStorage.user);

  const query = makeArrayToQuery({
    type: "genre",
    key: "genreId",
    data: genres,
  });

  try {
    const response = await fetch(`${url}/musics/by-like-genre/${_id}/?${query}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getMusicBySpecificMusic = async musics => {
  const { _id, token } = JSON.parse(localStorage.user);

  const query = makeArrayToQuery({
    type: "_id",
    key: "musicId",
    data: musics,
  });

  try {
    const response = await fetch(`${url}/musics/by-specific/${_id}/?${query}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getSampleUser = async () => {
  const { _id, token } = JSON.parse(localStorage.user);

  try {
    const response = await fetch(`${url}/users/sample/${_id}/?range=${sampleUserRange}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export default {
  loginLocal,
  loginSocial,
  loginRefresh,
  loginSocialByType,
  signup,
  logout,
  editUserLikeGenre,
  editUserProfileName,
  createMusic,
  updateLikeMusic,
  uploadUserProflePhoto,
  uploadMusicCoverPhoto,
  getGenre,
  getArtist,
  getMusicByLikeGenre,
  getMusicBySpecificMusic,
  getSampleUser,
};
