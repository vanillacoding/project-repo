let REACT_APP_SERVER_URI = '';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  REACT_APP_SERVER_URI = '';
} else {
  REACT_APP_SERVER_URI = process.env.REACT_APP_SERVER_URI;
}

const api = {};

api.get = async({ path, options = {} }) => {
  const token = localStorage.getItem('token');

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  Object.keys(options).forEach((key) => {
    headers[key.toLowerCase()] = options[key];
  });

  const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'GET',
    headers,
  }).then((result) => result.json());

  if (status >= 400) throw Error(errMessage);

  return data;
};

api.post = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  Object.keys(options).forEach((key) => {
    headers[key.toLowerCase()] = options[key];
  });

  const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((result) => result.json());

  if (status >= 400) throw Error(errMessage);

  return data;
};

api.put = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  Object.keys(options).forEach((key) => {
    headers[key.toLowerCase()] = options[key];
  });

  const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }).then((result) => result.json());

  if (status >= 400) throw Error(errMessage);

  return data;
};

api.delete = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  Object.keys(options).forEach((key) => {
    headers[key.toLowerCase()] = options[key];
  });

  await fetch(`${REACT_APP_SERVER_URI}${path}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  });

  return;
};

export default api;
