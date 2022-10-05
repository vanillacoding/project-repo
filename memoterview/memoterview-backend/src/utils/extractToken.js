module.exports = function extractToken(request) {
  const authToken = request.headers.authorization;

  if (!authToken || authToken.split(" ")[0] !== "Bearer") {
    return null;
  }

  const bearerToken = authToken.split(" ")[1];

  if (bearerToken) {
    return bearerToken;
  }

  return null;
};
