export const deleteUserCookie = () => {
  document.cookie = "authToken" + "=; Max-Age=-1";
};
