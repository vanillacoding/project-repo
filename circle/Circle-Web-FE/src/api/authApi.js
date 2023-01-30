import config from "../config";

export const getAuthUser = async () => {
  const request = {
    method: "GET",
    credentials: "include",
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/auth/users`,
    request
  );
  const data = await response.json();

  return data;
};

export const getUser = async (userData, token) => {
  const request = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/auth/users`,
    request
  );

  const data = await response.json();

  return data;
};

export const logOut = async () => {
  const request = {
    method: "POST",
    credentials: "include",
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/auth/logout`,
    request
  );
  const result = await response.json();

  return result;
};
