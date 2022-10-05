const express = require('express');
const axios = require('axios');
const createError = require('http-errors');
const dayjs = require('dayjs');

const ERROR = require('../constants/error');

const router = express.Router();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const CLIENT_URL = process.env.MY_CLIENT_URL;
const SERVER_URL = process.env.MY_SERVER_URL;

router.get('/', async (req, res, next) => {
  const { userProfile, token } = req.cookies;
  const data = req.headers;

  const { access_token: accessToken } = JSON.parse(token);

  try {
    const config = {
      method: 'get',
      url: 'https://id.twitch.tv/oauth2/validate',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const result = await axios(config);

    if (result.message) {
      throw createError(403, ERROR.FAIL_VALIDATION);
    }

    const { user_id: tokenOwnerId } = result.data;
    const { id: userId } = JSON.parse(userProfile);

    if (tokenOwnerId !== userId) {
      throw createError(403, ERROR.FAIL_VALIDATION);
    }

    res.json({ userProfile, accessToken });
  } catch (err) {
    throw createError(403, ERROR.FAIL_VALIDATION);
  }
});

router.get('/out', (req, res, next) => {
  res.cookie('token', null, {
    secure: true,
    httpOnly: true,
    expires: dayjs().add(1, 'second').toDate(),
  });

  res.cookie('userProfile', null, {
    secure: true,
    httpOnly: true,
    expires: dayjs().add(1, 'second').toDate(),
  });

  res.end();
});

router.get('/twitch/oauth/callback', async (req, res, next) => {
  const { code } = req.query;

  let token = null;

  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${SERVER_URL}/login/twitch/oauth/callback`
    );
    token = response.data;
    res.cookie('token', JSON.stringify(token), {
      secure: true,
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    });
  } catch (err) {
    throw createError(502, ERROR.FAIL_TO_GET_OAUTH_TOKEN);
  }

  try {
    const accessToken = token.access_token;
    const config = {
      method: 'get',
      url: 'https://api.twitch.tv/helix/users',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': CLIENT_ID,
      },
    };

    const user = await axios(config);
    const userProfile = user.data.data[0];

    res.cookie('userProfile ', JSON.stringify(userProfile), {
      secure: true,
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    });
  } catch (err) {
    throw createError(502, ERROR.FAIL_TO_GET_USER_PROFILE);
  }

  res.redirect(`${CLIENT_URL}/login/loading`);
});

module.exports = router;
