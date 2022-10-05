const createError = require('http-errors');
const Cat = require('../models/Cat');
const User = require('../models/User');

module.exports.savePhoto = async (data) => {
  try {
    const newCat = await new Cat(data).save();
    const user = await User.findById({ _id: newCat.founder });
    user.cats.push(newCat._id);
    await user.save();
    return [newCat, user];
  } catch (error) {
    next(createError(500));
  }
};
