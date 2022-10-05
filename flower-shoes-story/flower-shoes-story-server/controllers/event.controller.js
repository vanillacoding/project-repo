const Couple = require("../models/Couple");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Couple.findById(req.userInfo.couple._id);

    return res.status(200).json({
      result: "success",
      events: events.events,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const { eventName, startDate, endDate } = req.body;

    const events = await Couple.findOneAndUpdate(
      { _id: req.userInfo.couple._id },
      {
        $addToSet: {
          [`events.${eventName}`]: { startDate, endDate }
        },
      },
      { new: true }
    );

    return res.status(200).json({
      result: "success",
      events: events.events,
    });
  } catch (error) {
    next(error);
  }
};
