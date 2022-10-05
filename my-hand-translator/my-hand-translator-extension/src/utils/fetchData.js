export const createAuthHeader = (token) => {
  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  return authHeader;
};

const fetchData = (url, method = "GET", headers = {}, data = {}) => {
  const options = {
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then((response) => response.json());
};

export default fetchData;
