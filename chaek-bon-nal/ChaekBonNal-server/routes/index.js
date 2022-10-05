const express = require('express');
const router = express.Router();
const BookReport = require('../models/bookReport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.render('index');
})

router.post('/login', async (req, res) => {
  const { imageUrl, name, email } = req.body.response.profileObj;

  try {
    const userData = await User.findOneAndUpdate(
      { email },
      { imageUrl, name, email },
      { upsert: true, new: true }
    );

    const token = jwt.sign(
      { email },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, userData });
  } catch (error) {
    console.log(error)
  }
});

router.get('/non-member/book-reports', async (req, res) => {
  const bookReports = await BookReport.find().populate('author');
  res.status(200).json({ bookReports });
});

module.exports = router;
