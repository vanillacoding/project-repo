const Interviewer = require("../models/Interviewer");

exports.checkUser = async (email) => {
  try {
    const interviewer = await Interviewer.findOne({ email });

    return { interviewer };
  } catch (error) {
    return { error };
  }
};

exports.createUser = async (email, imageUrl, name) => {
  try {
    const newInterviewer = await Interviewer.create({
      email,
      avatar: imageUrl,
      username: name,
    });

    return { newInterviewer };
  } catch (error) {
    return { error };
  }
};
