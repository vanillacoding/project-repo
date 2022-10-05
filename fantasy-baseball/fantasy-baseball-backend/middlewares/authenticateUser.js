const { OAuth2Client } = require("google-auth-library");

const authenticateUser = async (req, res, next) => {
  const googleToken = req.headers.authorization.split(" ")[1];
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    res.locals.googleToken = googleToken;
    res.locals.profile = { name, email, picture };
    next();
  } catch (err) {
    res.clearCookie("access_token");
    res.status(401).json({
      result: "failure",
      message: "Unauthorized",
    });
  }
};

module.exports = authenticateUser;
