const getChannel = async (projectId) => {
  const request = {
    method: "GET",
    credentials: "include",
  };

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/projects/${projectId}`,
    request
  );

  const data = await response.json();

  return data.channels;
};

const createChannel = async ({ projectId, payload }) => {
  const request = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/channels`,
    request
  );

  const data = await response.json();

  return [data, response];
};

const putChannel = async ({ projectId, channelId, payload }) => {
  const request = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/channels/${channelId}`,
    request
  );

  const data = await response.json();

  return [data, response.status];
};

const deleteChannel = async (projectId, channelId) => {
  const request = {
    method: "DELETE",
    credentials: "include",
  };

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/channels/${channelId}`,
    request
  );

  const data = await response.json();

  return [data, response.status];
};

const api = {
  getChannel,
  createChannel,
  putChannel,
  deleteChannel,
};

export default api;
