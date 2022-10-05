const express = require("express");
const createError = require("http-errors");

const { checkUser, createUser } = require("../../services/loginService");
const { signAccessToken } = require("../../utils/jwtHelpers");
const validate = require("../middlewares/validate");
const { loginBodySchema } = require("../../utils/validationSchema");

const router = express.Router();

router.post("/", validate(loginBodySchema, "body"), async (req, res, next) => {
  try {
    const user = req.body;

    const { email, imageUrl, name } = user;
    const { interviewer, error } = await checkUser(email);
    let newUser;

    if (error) {
      next(createError(error));
    }

    if (!interviewer) {
      newUser = await createUser(email, imageUrl, name);
    }

    const userInfo = newUser ? newUser.newInterviewer : interviewer;
    const accessToken = await signAccessToken(userInfo);

    return res.json({
      result: "ok",
      data: {
        user: {
          id: userInfo._id,
          email: userInfo.email,
          avatar: userInfo.avatar,
          username: userInfo.username,
          myProjects: userInfo.myProjects,
          joinedProjects: userInfo.joinedProjects,
        },
        token: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
