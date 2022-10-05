const getidToken = (authorization) => {
  return authorization.split("Bearer ")[1];
};

module.exports = getidToken;
