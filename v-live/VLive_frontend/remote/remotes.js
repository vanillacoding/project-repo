async function request(method, url, user, body) {
  let response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        authorization: user && `bearer ${user?.token}`,
      },
      body,
    });
  } catch (err) {
    throw new Error(err);
  }

  return response;
}

export function getRequest(url, user, body) {
  return request('GET', url, user, body);
}

export function putRequest(url, user, body) {
  return request('PUT', url, user, body);
}

export function postRequest(url, user, body) {
  return request('POST', url, user, body);
}
