import axios from 'axios';
import _ from 'lodash';
import * as SecureStore from 'expo-secure-store';

import { IP_ADDRESS, ACCESS_TOKEN } from '../constants/config';
import { generateFaceType } from './index';

export const fetchSignup = (signupInfo, handleSubmit, navigation) => {
  axios({
    method: 'post',
    url: `${IP_ADDRESS}/api/auth/signup`,
    data: { ...signupInfo }
  })
  .then(response => {
    alert("회원가입을 축하합니다");
    handleSubmit();
    navigation.navigate('Login');
  })
  .catch(error => {
    if (error.response.status === 409) {
      alert('이미 존재하는 아이디입니다.');
    } else {
      alert("회원가입에 실패했습니다");
    }
  });
};

export const fetchLogin = (loginInfo, handleSubmit, navigation) => {
  axios({
    method: 'post',
    url: `${IP_ADDRESS}/api/auth/login`,
    data: { ...loginInfo }
  })
  .then(response => {
    const { user, token, photos } = response.data;
    
    alert("반갑습니다");

    SecureStore.setItemAsync(ACCESS_TOKEN, token);
    handleSubmit(true, user, photos);

    navigation.navigate('Home');
  })
  .catch(error => {
    alert("로그인에 실패했습니다");
  });
};

export const fetchUserPortraits = (user, setUserPortraits) => {
  axios({
    method: 'get',
    url: `${IP_ADDRESS}/api/users/${user._id}/photos`
  })
  .then(response => {
    setUserPortraits(response.data.photos);
  })
  .catch(error => {
    alert("failed!");
  });
};

export const fetchImage = async (photoUrl, loggedIn, setFaceType, navigation) => {
  const photo = {
    uri: photoUrl,
    name: 'new-photo.jpg',
    type: 'multipart/form-data',
  };

  const data = new FormData();
  data.append('photo', photo);

  axios.post(`${IP_ADDRESS}/api/users/${loggedIn.user._id}/photos`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    setFaceType(generateFaceType(response.data));
    navigation.navigate('Edit', { portrait: null, mode: 'Result' });
  })
  .catch(error => {
    alert('얼굴 분석에 실패했습니다');
  });
};

export const savePortrait = (method, user_id, faceType, departure, navigation, portrait) => {
  axios({
    method,
    url: `${IP_ADDRESS}/api/users/${user_id}/portraits`,
    data: portrait ? { portrait_id: portrait._id, faceType } : { faceType }
  })
  .then(() => {
    alert('저장 성공!');
    navigation.navigate(departure);
  })
  .catch(error => {
    alert("저장에 실패했습니다");
  });
};

export const deletePortrait = (item, user, setUserPortraits) => {
  axios({
    method: 'delete',
    url: `${IP_ADDRESS}/api/users/${user._id}/portraits`,
    data: { portrait_id: item._id }
  })
  .then(response => {
    setUserPortraits(response.data.photos);
  })
  .catch(error => {
    alert("삭제를 실패했습니다");
  });
};

export const handleFollow = (loggedIn, user, setSearchedUser) => {
  const isFollowing = user.followers.includes(loggedIn.user._id);
  const uri = isFollowing ? 'unfollow' : 'follow';

  axios({
    method: 'put',
    url: `${IP_ADDRESS}/api/users/${uri}`,
    data: { user_id: loggedIn.user._id, followee_id: user._id }
  })
  .then(response => {
    const newFollowers = user.followers;

    isFollowing ?
    _.remove(newFollowers, id => id === loggedIn.user._id)
    : newFollowers.push(loggedIn.user._id);

    setSearchedUser({ ...user, followers: newFollowers });
  })
  .catch(error => {
    alert("Upload failed!");
    console.log(error);
  });
};

export const handleDoubletap = (item, loggedIn, user, setUserPortraits) => {
  const uri = item.like_users.includes(loggedIn.user._id) ? 'unlike' : 'like';
  axios({
    method: 'put',
    url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/${uri}/${item._id}`,
    data: { owner_id: user._id }
  })
  .then(response => {
    setUserPortraits(response.data.photos);
  })
  .catch(error => {
    alert("Upload failed!");
  });
};

export const fetchKeyword = (keyword, loggedIn, setSearchKeyword, setSearchResults) => {
  setSearchKeyword(keyword);
  axios({
    method: 'get',
    url: `${IP_ADDRESS}/api/users/${loggedIn.user.user_id}/search`,
    params: { keyword: keyword }
  })
  .then(response => {
    setSearchResults(response.data);
  })
  .catch(error => {
    alert("Upload failed!");
  });
};
