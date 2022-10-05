import api from './config';

export const getUserData = async (userToken) => {
  const response = await api.get(`/users/${userToken}`);

  return response.data.userData;
};

export const getUserLibrary = async (userToken) => {
  const response = await api.get(`users/${userToken}/library`);

  return response.data.userLibrary;
};

export const getUserBookmarks = async (userToken) => {
  const response = await api.get(`users/${userToken}/bookmarks`);

  return response.data.userBookmarks;
};

export const deleteBookReport = async (userToken) => {
  const response = await api.delete(`users/${userToken}/writing`);

  return response.data.success;
}
