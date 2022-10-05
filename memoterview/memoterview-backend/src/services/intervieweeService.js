const Interviewee = require("../models/Interviewee");
const Project = require("../models/Project");
const Question = require("../models/Question");

exports.createInterviewee = async ({ email, name, resumeUrl }) => {
  try {
    const newInterviewee = await Interviewee.create({
      email,
      name,
      resumePath: resumeUrl,
    }); // todo. session 넣기
    return newInterviewee;
  } catch (error) {
    return { error };
  }
};

exports.deleteInterviewees = async ({ intervieweeIds }, session) => {
  try {
    const deletedIntervieweesResult = await Interviewee.deleteMany({
      _id: {
        $in: intervieweeIds,
      },
    }).session(session);

    return { deletedIntervieweesResult };
  } catch (error) {
    return { error };
  }
};

exports.deleteInterviewee = async ({ intervieweeId }, session) => {
  try {
    const deletedInterviewee = await Interviewee.findByIdAndDelete(intervieweeId)
      .session(session);

    return { deletedInterviewee };
  } catch (error) {
    return { error };
  }
};

exports.getInterviewee = async (intervieweeId) => {
  try {
    const interviewee = await Interviewee.findOne({ _id: intervieweeId }).lean();

    return { interviewee };
  } catch (error) {
    return { error };
  }
};

exports.getInterviewees = async (projectId) => {
  try {
    const { candidates } = await Project
      .findOne({ _id: projectId })
      .populate({
        path: "candidates",
        populate: [{
          path: "comments.commenter",
          model: "Interviewer",
        },
        {
          path: "questions",
        }],
      }).lean();

    return { candidates };
  } catch (error) {
    return { error };
  }
};

exports.updateInterviewee = async ({ intervieweeId, interviewee }) => {
  try {
    const intervieweeData = await Interviewee.findOne({
      _id: intervieweeId,
    });

    Object.keys(interviewee.filterScores).forEach((key) => {
      if (!intervieweeData.filterScores[key]) {
        intervieweeData.filterScores[key] = [];
      }

      intervieweeData.filterScores[key].push(interviewee.filterScores[key]);
    });

    const updatedInterviewee = await Interviewee.findByIdAndUpdate(
      intervieweeId,
      {
        $set: {
          filterScores: { ...intervieweeData.filterScores },
        },
        $push: {
          comments: interviewee.comments,
        },
        interviewDuration: interviewee.interviewDuration,
      },
      { new: true }
    );

    return { intervieweeData: updatedInterviewee };
  } catch (error) {
    return { error };
  }
};

exports.updateIntervieweeQuestion = async ({ projectId, intervieweeId, question }) => {
  try {
    const newQuestion = await Question.create({
      ...question,
      project: projectId,
      interviewee: intervieweeId,
    });

    await Interviewee.findByIdAndUpdate(
      intervieweeId,
      {
        $push: {
          questions: newQuestion,
        },
      },
      { new: true }
    );
  } catch (error) {
    return { error };
  }
};

exports.updateInterviewRoom = async ({ intervieweeId, isRoomOpened }) => {
  try {
    const interviewee = await Interviewee.findByIdAndUpdate(
      intervieweeId,
      { isRoomOpened },
      { new: true }
    );

    return { interviewee };
  } catch (error) {
    return { updateInterviewRoom: error };
  }
};

exports.updateInterviewComplete = async ({ intervieweeId, interviewDuration }) => {
  try {
    const interviewee = await Interviewee.findByIdAndUpdate(
      intervieweeId,
      {
        isRoomOpened: false,
        isInterviewed: true,
        interviewDate: new Date(),
        interviewDuration,
      },
      { new: true }
    );

    return { interviewee };
  } catch (error) {
    return { error };
  }
};
