const WHERE_IS_KIM_BACK_URL = "https://api.where-is-kim.site";
const GET_TOKEN = `${WHERE_IS_KIM_BACK_URL}/auth/login`;
const SIGNUP = `${WHERE_IS_KIM_BACK_URL}/auth/signup`;
const REGISTER_TEAM = `${WHERE_IS_KIM_BACK_URL}/team/new`;
const VERIFY_USER = `${WHERE_IS_KIM_BACK_URL}/team/verify`;
const getTeamJoinUrl = (name) =>
  `${WHERE_IS_KIM_BACK_URL}/team/${name}/join`;
const getWorkOnUrl = (id) => `${WHERE_IS_KIM_BACK_URL}/team/${id}/onWork`;
const getWorkOffUrl = (id) => `${WHERE_IS_KIM_BACK_URL}/team/${id}/offWork`;
const getToggleLikeThreadUrl = (id) =>
  `${WHERE_IS_KIM_BACK_URL}/thread/${id}/like`;
const getCommentThreadUrl = (id) =>
  `${WHERE_IS_KIM_BACK_URL}/thread/${id}/comment`;
const getRecordUrl = (id) => `${WHERE_IS_KIM_BACK_URL}/team/${id}/records`;
const getInviteUrl = (id) => `${WHERE_IS_KIM_BACK_URL}/team/${id}/invite`;
const getUpdateAdminsUrl = (id) =>
  `${WHERE_IS_KIM_BACK_URL}/team/${id}/admins`;

export const getTokenAPI = (email, password) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  };

  return fetch(GET_TOKEN, options);
};

export const signupAPI = (username, email, password, profile) => {
  const data = new FormData();

  data.append("username", username);
  data.append("email", email);
  data.append("password", password);
  data.append("profile", profile);

  const options = {
    method: "POST",
    body: data,
  };

  return fetch(SIGNUP, options);
};

export const registerTeamAPI = (
  teamName,
  createdBy,
  latitude,
  longitude,
  workOnTime,
  workOffTime,
  thumbnail
) => {
  const data = new FormData();

  data.append("teamName", teamName);
  data.append("createdBy", createdBy);
  data.append("latitude", latitude);
  data.append("longitude", longitude);
  data.append("workOnTime", workOnTime);
  data.append("workOffTime", workOffTime);
  data.append("file", thumbnail);

  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "POST",
    body: data,
  };

  return fetch(REGISTER_TEAM, options);
};

export const verifyAPI = (token) => {
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    method: "POST"
  };

  return fetch(`${VERIFY_USER}?token=${token}`, options);
};

export const joinTeamAPI = (teamName, userId) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  };

  return fetch(getTeamJoinUrl(teamName), options);
};

export const workOnAPI = (teamId, userId) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  };

  return fetch(getWorkOnUrl(teamId), options);
};

export const workOffAPI = (teamId, userId) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  };

  return fetch(getWorkOffUrl(teamId), options);
};

export const toggleLikeAPI = (threadId, userId) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  };

  return fetch(getToggleLikeThreadUrl(threadId), options);
};

export const addComment = (commentId, userId, text) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
      text,
    }),
  };

  return fetch(getCommentThreadUrl(commentId), options);
};

export const getRecordAPI = (teamId, userId) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  };

  return fetch(getRecordUrl(teamId), options);
};

export const inviteUserAPI = (teamId, email) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      memberEmail: email,
    }),
  };

  return fetch(getInviteUrl(teamId), options);
};

export const updateAdminsAPI = (teamId, admins) => {
  const token = localStorage.token;
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      admins,
    }),
  };

  return fetch(getUpdateAdminsUrl(teamId), options);
};
