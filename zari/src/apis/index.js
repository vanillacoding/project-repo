import { auth, firebase } from './firebase';

async function login(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

async function getData() {
  const url = `${process.env.REACT_APP_SERVER_URL}/user`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });

  return response;
}

async function getRooms() {
  const url = `${process.env.REACT_APP_SERVER_URL}/room`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });

  return response;
}

async function patchCharacter(data) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/character`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function googleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);

    const token = await auth?.currentUser?.getIdToken(true);

    if (token) {
      const response = await login({ id_token: token });
      const responseBody = await response.json();

      localStorage.setItem('accessToken', responseBody.data.accessToken);

      await firebase.auth().signOut();

      return responseBody.data;
    } else {
      throw new Error('login fail');
    }
  } catch (err) {
    throw new Error('login fail');
  }
}

export async function getUserData() {
  try {
    const response = await getData();
    const responseBody = await response.json();

    return responseBody.data;
  } catch (err) {
    throw new Error('login fail');
  }
}

export async function getRoomList() {
  try {
    const response = await getRooms();
    const responseBody = await response.json();

    return responseBody.data;
  } catch (err) {
    throw new Error('login fail');
  }
}

export async function patchUserCharacter(data) {
  try {
    const response = await patchCharacter(data);
    const responseBody = await response.json();

    return responseBody.data;
  } catch (err) {
    throw new Error('update character fail');
  }
}
