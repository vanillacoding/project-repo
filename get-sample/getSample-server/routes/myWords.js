const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res, next) => {
  const { google_id, myWords } = req.body;
  try {
    const user = await User.findOne({ google_id: google_id });
    user.my_words = {
      ...user.my_words,
      ...myWords,
    };
    await user.save();

    res.status(200).json({
      result: 'ok',
      message: 'my_words is successfully updated.',
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.delete('/', async (req, res, next) => {
  const { google_id, word } = req.body;
  try {
    //시간될 때 고치기
    const user = await User.findOne({ google_id: google_id });
    const userDoc = JSON.parse(JSON.stringify(user._doc));
    delete userDoc.my_words[word];

    await User.findByIdAndUpdate(
      { _id: userDoc._id },
      { my_words: userDoc.my_words },
    );

    res.status(200).json({
      result: 'ok',
      message: `${userDoc.my_words[word]} is successfully deleted.`,
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
