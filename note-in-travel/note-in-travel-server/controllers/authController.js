const jwt = require("jsonwebtoken");

const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
  const { email, name, photoUrl } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name, photoUrl });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
  );

  await user
    .populate("myCourses")
    .populate("favoriteCourses")
    .populate("favoriteSites")
    .execPopulate();

  res.json({
    ok: true,
    data: { user, token },
  });
});
