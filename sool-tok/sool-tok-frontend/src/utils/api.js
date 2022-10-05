import firebase from './firebase';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setToken = token => localStorage.setItem('jwt-token', token);
const getToken = () => localStorage.getItem('jwt-token');
const removeToken = () => localStorage.removeItem('jwt-token');

const googleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const { user } = await firebase.auth().signInWithPopup(provider);
  const userInfo = {
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  };

  const { data } = await axios.post('/users/login/google', userInfo);
  setToken(data.token);

  return { user: data.user };
};

const tokenLogin = async () => {
  const token = getToken();

  if (!token) return { user: null };

  const { data } = await axios.post('/users/login/token', { token });
  return { user: data.user };
};

const logout = async userId => {
  const token = getToken();

  await axios.post(`/users/${userId}/logout`, null, {
    headers: {
      'jwt-token': token,
    },
  });

  removeToken();
};

const getFriendList = async userId => {
  const token = getToken();

  const { data } = await axios.get(`/users/${userId}/friends`, {
    headers: {
      'jwt-token': token,
    },
  });

  return data.friendList;
};

const getFriendRequestList = async userId => {
  const token = getToken();

  const { data } = await axios.get(`/users/${userId}/friends/request`, {
    headers: {
      'jwt-token': token,
    },
  });

  return data.friendRequestList;
};

const requestFriend = async (userId, email) => {
  try {
    const token = getToken();
    const { data } = await axios.post(
      `/users/${userId}/friends/request`,
      { email },
      {
        headers: {
          'jwt-token': token,
        },
      },
    );

    return { message: data.message };
  } catch (err) {
    throw err.response.data.message;
  }
};

const responseFriendRequest = async (userId, isAccepted, targetUserId) => {
  const token = getToken();

  const { data } = await axios.put(
    `/users/${userId}/friends/request`,
    {
      isAccepted,
      target_user_id: targetUserId,
    },
    {
      headers: {
        'jwt-token': token,
      },
    },
  );

  return data.friendRequestList;
};

const userService = {
  googleLogin,
  tokenLogin,
  logout,
  getFriendList,
  getFriendRequestList,
  requestFriend,
  responseFriendRequest,
};

export { userService };
