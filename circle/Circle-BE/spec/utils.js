const mongoose = require('mongoose');
const axios = require("axios");
const User = require("../models/User");
const Project = require('../models/Project');
const Channel = require('../models/Channel');

const { admin } = require('../config/firebase.config');
const logger = require('../libs/logger');

module.exports = {
  testDbConnect: async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_TEST, { dbName: process.env.MONGODB_TEST_DB_NAME });
    logger.info("Test database is connected");
  },

  postLoginAndGetCookie: async (server) => {
    const googleUserInfo = {
      displayName: process.env.DISPLAY_NAME,
      email: process.env.EMAIL,
      photoUrl: process.env.PHOTO_URL,
      uid: process.env.UID,
    };

    const token = await admin.auth().createCustomToken(process.env.UID);

    const getGoogleIdToken = await axios({
      method: 'post',
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      data: {
        token,
        returnSecureToken: true,
      },
    });

    const { idToken } = getGoogleIdToken.data;

    const response = await server
      .post("/auth/users")
      .send(googleUserInfo)
      .set("Authorization", `Bearer ${idToken}`)
      .expect("set-cookie", /session/)
      .expect(200);

    return response;
  },

  cleanUpTestDatabase: async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Channel.deleteMany({});
  },
};
