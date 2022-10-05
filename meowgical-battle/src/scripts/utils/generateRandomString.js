const generateRandomString = () => {
  return Math.random().toString(36).slice(2, 9);
};

export default generateRandomString;
