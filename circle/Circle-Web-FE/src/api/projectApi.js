import config from "../config";

export const getProject = async (projectId) => {
  const request = {
    method: "GET",
    credentials: "include",
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/projects/${projectId}`,
    request
  );
  const data = await response.json();

  return data;
};

export const createProject = async (title) => {
  const request = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/projects`,
    request
  );
  const data = await response.json();

  return data;
};

export const editProject = async (title, projectId) => {
  const request = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/projects/${projectId}`,
    request
  );
  const data = await response.json();

  return data;
};

export const deleteProject = async (projectId) => {
  const request = {
    method: "DELETE",
    credentials: "include",
  };

  const response = await fetch(
    `${config.REACT_APP_SERVER_URL}/projects/${projectId}`,
    request
  );
  const data = await response.json();

  return data;
};
