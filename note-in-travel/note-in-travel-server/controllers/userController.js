const jwt = require("jsonwebtoken");
const Site = require("../models/Site");
const Course = require("../models/Course");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  const { user } = req;

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

exports.addFavoriteCourse = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const isBookmarked = user.favoriteCourses.includes(courseId);

  if (isBookmarked) {
    return next(new AppError("이미 등록되어 있습니다.", 400));
  }

  const newCourse = await Course.findByIdAndUpdate(
    courseId,
    { $push: { favorites: user._id } },
    { new: true },
  );

  newCourse.schedules.length > 0 && newCourse.populate("schedules.site");
  newCourse.messages.length > 0 && newCourse.populate("messages");

  await newCourse.populate("creator").execPopulate();

  user.favoriteCourses.push(courseId);
  await user.save();

  res.json({
    ok: true,
    data: newCourse,
  });
});

exports.deleteFavoriteCourse = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const isBookmarked = user.favoriteCourses.includes(courseId);

  if (!isBookmarked) {
    return next(new AppError("좋아요 목록에 존재하지 않습니다.", 400));
  }

  const newCourse = await Course.findByIdAndUpdate(
    courseId,
    { $pull: { favorites: user._id } },
    { new: true },
  );

  newCourse.schedules.length > 0 && newCourse.populate("schedules.site");
  newCourse.messages.length > 0 && newCourse.populate("messages");

  await newCourse.populate("creator").execPopulate();

  user.favoriteCourses.pull(courseId);
  await user.save();

  res.json({
    ok: true,
    data: newCourse,
  });
});

exports.addFavoriteSite = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { siteId } = req.params;

  const site = await Site.findById(siteId);
  const isBookmarked = user.favoriteSites.includes(siteId);

  if (isBookmarked) {
    return next(new AppError("이미 등록되어 있습니다.", 400));
  }

  user.favoriteSites.push(siteId);
  await user.save();

  res.json({
    ok: true,
    data: site,
  });
});

exports.deleteFavoriteSite = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { siteId } = req.params;

  const site = await Site.findById(siteId);
  const isBookmarked = user.favoriteSites.includes(siteId);

  if (!isBookmarked) {
    return next(new AppError("좋아요 목록에 존재하지 않습니다.", 400));
  }

  user.favoriteSites.pull(siteId);
  await user.save();

  res.json({
    ok: true,
    data: site,
  });
});
