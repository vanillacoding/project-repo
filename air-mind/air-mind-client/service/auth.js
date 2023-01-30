import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setCookie, deleteCookie } from 'cookies-next';
import { auth } from '../config/firebase';

import API from '../network/http';

export async function login() {
  try {
    const provider = new GoogleAuthProvider();
    const userData = await signInWithPopup(auth, provider);
    GoogleAuthProvider.credentialFromResult(userData);
    const { user } = userData;
    const idToken = await user.getIdToken();

    const response = await API({
      method: 'post',
      url: '/users/login',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const { _id: id } = response.user;

    if (response && response.result === 'error') {
      throw Error('Authentication Error');
    }

    setCookie('loginData', idToken, { secure: false }); // true 일 경우 https 접속을 지원하지 않는다면 쿠키가 저장되지 않으므로, 그 경우 false 로 설정해야 함
    setCookie('loginData-id', id, { secure: false });
    setCookie('loginTime', new Date());

    response.token = idToken;
    return response;
  } catch (error) {
    return console.error(error);
  }
}

export async function logOut() {
  await auth.signOut();
  deleteCookie('loginData');
}
