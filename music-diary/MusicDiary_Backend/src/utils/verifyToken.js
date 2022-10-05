const tokenExpirationTime = process.env.ACCESS_TOKEN_EXPIRES_IN;

exports.verifyToken = function (accessToken) {
  // const expirationTime = new Date().getTime() + tokenExpirationTime * 1000;

  // if (new Date().getTime() > expirationTime) {
  //   console.log("finished");
  // }
  // refreshToken
  // return newAccessToken -> all req go through this verification process -> next
};
