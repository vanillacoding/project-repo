const API_URL = process.env.REACT_APP_API_ADDRESS;

export const fetchUser = async (tokenId, path) => {
  const response = await fetch(`${API_URL}/users/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenId}`,
    },
    credentials: "include",
  });

  return response;
};

export const deleteUser = async () => {
  const response = await fetch(`${API_URL}/users/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
};
