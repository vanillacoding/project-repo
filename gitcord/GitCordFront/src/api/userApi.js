export async function sendNewUser(newUser) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  });

  return await response.json();
}

export async function putLogin(loginInfo) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(loginInfo)
  });

  return await response.json();
}

export async function postGoogleLogin(profileObj) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(profileObj)
  });

  return await response.json();
}

export async function postAuthToken(token) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(token)
  });

  return await response.json();
}
