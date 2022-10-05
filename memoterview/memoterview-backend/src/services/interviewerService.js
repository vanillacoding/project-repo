const Interviewer = require("../models/Interviewer");

exports.searchByEmail = async (email) => {
  try {
    const query =
      email.indexOf("@") !== -1
        ? new RegExp(`${email}`, "i")
        : new RegExp(`.*${email}.*@.*`, "i");

    const emailSearchList = await Interviewer.find({ email: query })
      .sort({ username: -1 })
      .limit(5)
      .lean();

    return { emailSearchList };
  } catch (error) {
    return { error };
  }
};

exports.deleteProjectOnMyProjects = async ({ creator, projectId }, session) => {
  try {
    const deletedMyProjects = await Interviewer.findByIdAndUpdate(
      creator,
      { $pull: { myProjects: projectId } },
      { safe: true, upsert: true }
    ).session(session);

    return { deletedMyProjects };
  } catch (error) {
    return { error };
  }
};

exports.deleteProjectOnJoinedProjects = async ({ participants, projectId }, session) => {
  try {
    const deletedJoinedProjects = participants.map((participantId) =>
      Interviewer.findByIdAndUpdate(
        participantId,
        { $pull: { joinedProjects: projectId } },
        { safe: true, upsert: true }
      ).session(session)
    );

    const joinedProjectsResults = await Promise.all(deletedJoinedProjects);

    return { joinedProjectsResults };
  } catch (error) {
    return { error };
  }
};
