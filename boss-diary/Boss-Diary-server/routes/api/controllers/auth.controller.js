const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const { vaildEmail } = require('../../../constants/regex');
const sendMessage = require('../../../constants/sendMessages');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  try {
    const { email, name, profilePhoto } = req.body;

    if (!vaildEmail.test(email)) {
      throw new Error('Invaild email');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      const userData = await new User({
        name,
        email,
        profile_photo: profilePhoto,
        resports: [],
        templates: [],
        approval_requests: []
      }).save();

      const { _id } = userData;
      const token = jwt.sign(
        {
          email,
          name,
          _id
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '7d'
        }
      );

      return res.json({
        message: sendMessage.LOGGED_IN,
        user_id: _id,
        access_token: token
      });
    }

    await User.updateOne(
      {
        _id: user._id
      },
      {
        $set: { profile_photo : profilePhoto }
      }
    );

    const token = jwt.sign(
      {
        email,
        name,
        _id: user._id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );

    res.json({
      message: sendMessage.LOGGED_IN,
      user_id: user._id,
      access_token: token
    });
  } catch(err) {
    next(new Error(err));
  }
};
