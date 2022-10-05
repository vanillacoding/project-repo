import { authService, googleProvider } from '../config/firebase';
import { API_METHOD } from '../constants';
import { SERVER_URL } from '../config/index';

export const signInWithGoogle = () => {
  googleProvider.addScope('email');

  return authService.signInWithPopup(googleProvider)
    .then((userInfo) => {
      const { POST } = API_METHOD;
      const postData = {
        email: userInfo.additionalUserInfo.profile.email,
        nickname: userInfo.additionalUserInfo.profile.name,
      };

      const userData = fetch(`${SERVER_URL}/login`, {
        method: POST,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(postData)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log("!!!!!!!", data);
        return data;
      }).catch((err) => {
        console.error(err);
      });

      return userData;
    }).catch((err) => {
      console.error(err);
    });
};
