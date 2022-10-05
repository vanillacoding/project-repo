const getAuthHeaderByToken = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default getAuthHeaderByToken;
