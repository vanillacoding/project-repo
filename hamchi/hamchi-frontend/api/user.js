import { SERVER_URL } from '@env';

const requestSignin = async (signinInput) => {
  const url = `${SERVER_URL}/user/signin`;
  const body = JSON.stringify(signinInput);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });

  return await response.json();
};

const requestSignup = async (signupInput) => {
  const url = `${SERVER_URL}/user/signup`;
  const body = JSON.stringify(signupInput);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });

  return await response.json();
};

const userAPI = {
  requestSignin,
  requestSignup
};

export default userAPI;
