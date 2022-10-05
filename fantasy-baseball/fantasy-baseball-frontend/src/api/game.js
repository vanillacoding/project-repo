const API_URL = process.env.REACT_APP_API_ADDRESS;

export const fetchSchedule = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/schedule`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchPlayers = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/players`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchBettingStatus = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/betting`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const postBetting = async (date, bettingData) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token"))
    .split("=")[1];

  const response = await fetch(`${API_URL}/games/${date}/betting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      ...bettingData,
    }),
  });

  return response;
};

export const fetchUserRankings = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/rankings/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchPlayerRankings = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/rankings/players`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchPositionRankings = async (date) => {
  const response = await fetch(`${API_URL}/games/${date}/rankings/positions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchRoaster = async (date) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token"))
    .split("=")[1];

  const response = await fetch(`${API_URL}/games/${date}/roaster`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return response;
};

export const fetchBettingHistory = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token"))
    .split("=")[1];

  const response = await fetch(`${API_URL}/games/betting-history`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return response;
};
