const createError = require('http-errors');
const Cat = require('../../models/Cat');
const User = require('../../models/User');

exports.sendMyCatData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('cats');
    res.json({ result: 'ok', cats: user.cats});
  } catch (error) {
    next(createError(500));
  }
};

exports.sendLikedCatData = async (req, res, next) => {
  try {
    const  { id } = req.params;
    const cats = await Cat.find({ likes : { $in : [id] }});
    res.json({ result: 'ok', cats: cats});
  } catch (error) {
    next(createError(500));
  }
};
