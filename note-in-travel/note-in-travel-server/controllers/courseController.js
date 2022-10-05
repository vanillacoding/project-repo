const mongoose = require("mongoose");

const Course = require("../models/Course");
const Message = require("../models/Message");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.addCourse = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, region: courseRegion, schedules } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const convertedSchedules = schedules.map(({ index, site }) => ({ index, site: site._id }));
    const [newCourse] = await Course.create([{
      name,
      creator: userId,
      region: courseRegion,
      schedules: convertedSchedules,
    }], { session });

    await User.findByIdAndUpdate(
      userId,
      { $push: { myCourses: newCourse._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.json({
      ok: true,
      data: newCourse,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    next(new AppError("저장 중 오류 발생. 재시도 해주세요.", 500));
  }
});

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find().lean();

  res.json({
    ok: true,
    data: courses,
  });
});

exports.getCourseById = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError("잘못된 파라미터입니다.", 404));
  }

  course.schedules.length > 0 && course.populate("schedules.site");
  course.messages.length > 0 && course.populate("messages");

  await course.populate("creator").execPopulate();

  res.json({
    ok: true,
    data: course,
  });
});

exports.saveMessage = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { _id: userId } = req.user;
  const { content, location } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError("잘못된 파라미터입니다.", 404));
  }

  const newMessage = await Message.create({
    creator: userId,
    content,
    location,
  });

  course.messages.push(newMessage._id);
  await course.save();

  res.json({
    ok: true,
    data: newMessage,
  });
});
