const { verifyGoogleToken } = require("../../../utils/socialLoginAuth");
const { LOGIN_TYPE } = require("../../../constants");
const { signJWTToken } = require("../../../utils/jwtToken");

exports.loginMutation = async function loginMutation({ type, token, email, password }, userDataSource) {
  let loginUser;

  switch (type) {
    case LOGIN_TYPE.GOOGLE: {
      loginUser = await verifyGoogleToken(token);
      break;
    }
    default: {
      loginUser = {
        email,
        password,
      };
    }
  }

  let user = await userDataSource.getUserByQuery({ email: loginUser.email });

  if (!user) {
    const newUser = await userDataSource.createUser({
      ...loginUser,
    });

    user = newUser;
  }

  const jwtToken = await signJWTToken({ _id: user._id });

  return jwtToken;
};
