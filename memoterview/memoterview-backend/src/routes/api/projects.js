const express = require("express");
const { startSession } = require("mongoose");
const multer = require("multer");
const util = require("util");
const fs = require("fs");

const { getAverageScore, getFilterAvgScors } = require("../../utils/getAverageScroe");
const {
  createProjectBodySchema,
  projectIdParamsSchema,
  updateRoomStateBodySchema,
  sendInvitingEmailBodySchema,
  projectIntervieweeIdParamsSchema,
  updateInterviewRoomBodySchema,
  intervieweeIdParamsSchema,
  serachIntervieweeQuestionQuerySchema,
} = require("../../utils/validationSchema");
const {
  createProject,
  addToMyProjects,
  addToJoinedProjects,
  addCandidateToProject,
  deleteProjects,
  deleteCandidate,
  searchQuestions,
} = require("../../services/projectService");
const {
  deleteProjectOnMyProjects,
  deleteProjectOnJoinedProjects,
} = require("../../services/interviewerService");
const {
  getInterviewee,
  deleteInterviewees,
  getInterviewees,
  createInterviewee,
  updateInterviewee,
  deleteInterviewee,
  updateInterviewRoom,
} = require("../../services/intervieweeService");
const validate = require("../middlewares/validate");
const { generateResumeUrl } = require("../../utils/generateResumeUrl");
const { uploadFileToS3 } = require("../../loaders/s3");
const { sendInviteEmail } = require("../../services/mailService");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/",
  validate(createProjectBodySchema, "body"),
  async (req, res, next) => {
    const session = await startSession();

    try {
      session.startTransaction();
      const project = req.body;
      // TO-DO : Handling session for Model.Create()
      // TO-DO : Validate transaction through intentional mistakes
      const {
        newProject: {
          _id,
          creator,
          participants,
          title,
          filters,
          candidates,
          createdAt,
          category,
        },
      } = await createProject(project, session);

      await addToMyProjects(creator, _id, session);
      await addToJoinedProjects(participants, _id, session);

      await session.commitTransaction();
      session.endSession();

      return res.json({
        result: "ok",
        data: {
          id: _id,
          title,
          filters,
          creator,
          participants,
          createAt: createdAt,
          candidateNum: candidates.length,
          category,
        },
      });
    } catch (error) {
      await session.abortTransaction();

      session.endSession();
      next(error);
    }
  }
);

router.get("/:project_id/interviewees", async (req, res, next) => {
  try {
    const projectId = req.params.project_id;
    const { candidates } = await getInterviewees(projectId);

    const intervieweeList = candidates.map((interviewee) => ({
      id: interviewee._id,
      _id: interviewee._id,
      name: interviewee.name,
      email: interviewee.email,
      interviewDate: interviewee.interviewDate,
      resumePath: interviewee.resumePath,
      filterScores: interviewee.filterScores,
      questions: interviewee.questions,
      comments: interviewee.comments,
      isInterviewed: interviewee.isInterviewed,
      interviewDuration: interviewee.interviewDuration,
      isRoomOpened: interviewee.isRoomOpened,
      questionsNum: interviewee.questions.length,
      commentAvgScore: getAverageScore(interviewee.comments),
      questionAvgScore: getAverageScore(interviewee.questions),
      filterAvgScores: getFilterAvgScors(interviewee.filterScores),
    }));

    return res.json({
      result: "ok",
      data: intervieweeList,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:project_id/interviewees",
  validate(projectIdParamsSchema, "params"),
  // TO-DO: validation form data
  upload.single("pdf"),
  async (req, res, next) => {
    const session = await startSession();

    try {
      session.startTransaction();
      const { project_id: projectId } = req.params;
      const { name, email } = req.body;
      const file = req.file;

      const { key } = await uploadFileToS3(file);

      const resumeUrl = generateResumeUrl(key);

      const unlinkFile = util.promisify(fs.unlink);

      await unlinkFile(file.path);

      // TO-DO : Handling session for Model.Create()
      // TO-DO : Validate transaction through intentional mistakes
      const newInterviewee = await createInterviewee(
        { email, name, resumeUrl },
        session
      );

      await addCandidateToProject(projectId, newInterviewee._id, session);

      await session.commitTransaction();
      session.endSession();

      return res.json({
        result: "ok",
        data: {
          _id: newInterviewee._id,
          id: newInterviewee._id,
          name: newInterviewee.name,
          email: newInterviewee.email,
          interviewDate: newInterviewee.interviewDate,
          resumePath: newInterviewee.resumePath,
          filterScores: newInterviewee.filterScores,
          questions: newInterviewee.questions,
          comments: newInterviewee.comments,
          isInterviewed: newInterviewee.isInterviewed,
          interviewDuration: newInterviewee.interviewDuration,
          isRoomOpened: newInterviewee.isRoomOpened,
          questionsNum: newInterviewee.questions.length,
          commentAvgScore: getAverageScore(newInterviewee.comments),
          questionAvgScore: getAverageScore(newInterviewee.questions),
          filterAvgScores: getFilterAvgScors(newInterviewee.filterScores),
        },
      });
    } catch (error) {
      await session.abortTransaction();

      session.endSession();
      next(error);
    }
  }
);

router.get(
  //validation 필요
  "/:project_id/interviewees/:interviewee_id",
  async (req, res, next) => {
    try {
      const intervieweeId = req.params.interviewee_id;
      const { interviewee } = await getInterviewee(intervieweeId);

      return res.json({
        result: "ok",
        data: {
          _id: interviewee._id,
          id: interviewee._id,
          name: interviewee.name,
          email: interviewee.email,
          interviewDate: interviewee.interviewDate,
          resumePath: interviewee.resumePath,
          filterScores: interviewee.filterScores,
          questions: interviewee.questions,
          comments: interviewee.comments,
          isInterviewed: interviewee.isInterviewed,
          interviewDuration: interviewee.interviewDuration,
          isRoomOpened: interviewee.isRoomOpened,
          questionsNum: interviewee.questions.length,
          commentAvgScore: getAverageScore(interviewee.comments),
          questionAvgScore: getAverageScore(interviewee.questions),
          filterAvgScores: getFilterAvgScors(interviewee.filterScores),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:project_id/search",
  validate(serachIntervieweeQuestionQuerySchema),
  async (req, res, next) => {
    try {
      const query = req.query.question;
      const projectId = req.params.project_id;

      const questionData = await searchQuestions({ query, projectId });

      return res.json({
        result: "ok",
        data: questionData,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:project_id",
  validate(projectIdParamsSchema, "params"),
  async (req, res, next) => {
    const session = await startSession();

    try {
      session.startTransaction();
      const { project_id: projectId } = req.params;

      const { deletedProject } = await deleteProjects(projectId, session);

      const { creator, participants, candidates } = deletedProject;

      await deleteProjectOnMyProjects({ creator, projectId }, session);

      await deleteProjectOnJoinedProjects({ participants, projectId }, session);

      await deleteInterviewees({ intervieweeIds: candidates }, session);

      await session.commitTransaction();
      session.endSession();

      return res.json({
        result: "ok",
        data: deletedProject,
      });
    } catch (error) {
      await session.abortTransaction();

      session.endSession();
      next(error);
    }
  }
);

router.patch(
  "/:project_id/interviewees/:interviewee_id", // need validation
  async (req, res, next) => {
    try {
      const { intervieweeId, interviewee } = req.body; // project Id 있음
      const updatedInterviewee = await updateInterviewee({ intervieweeId, interviewee });

      return res.json({
        data: {
          _id: updatedInterviewee._id,
          id: updatedInterviewee._id,
          name: updatedInterviewee.name,
          email: updatedInterviewee.email,
          interviewDate: updatedInterviewee.interviewDate,
          resumePath: updatedInterviewee.resumePath,
          filterScores: updatedInterviewee.filterScores,
          questions: updatedInterviewee.questions,
          comments: updatedInterviewee.comments,
          isInterviewed: updatedInterviewee.isInterviewed,
          interviewDuration: updatedInterviewee.interviewDuration,
          isRoomOpened: updatedInterviewee.isRoomOpened,
          questionsNum: updatedInterviewee.questions?.length,
          commentAvgScore: getAverageScore(updatedInterviewee.comments),
          questionAvgScore: getAverageScore(updatedInterviewee.questions),
          filterAvgScores: getFilterAvgScors(updatedInterviewee.filterScores),
        },
        result: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:project_id/interviewees/:interviewee_id/invite",
  validate(projectIntervieweeIdParamsSchema, "params"),
  validate(sendInvitingEmailBodySchema, "body"),
  async (req, res, next) => {
    const { userEmail, welcomePageLink } = req.body;

    const mailInfo = await sendInviteEmail({ welcomePageLink, userEmail });

    res.json({
      result: "ok",
      data: mailInfo,
      message: "Sent Email",
    });
  }
);

router.patch(
  "/:project_id/interviewees/:interviewee_id/updateInterviewRoom",
  validate(projectIntervieweeIdParamsSchema, "params"),
  validate(updateInterviewRoomBodySchema, "body"),
  async (req, res, next) => {
    const { interviewee_id: intervieweeId } = req.params;
    const { isRoomOpened } = req.body;

    const { interviewee } = await updateInterviewRoom({ intervieweeId, isRoomOpened });

    res.json({
      result: "ok",
      data: {
        _id: interviewee._id,
        id: interviewee._id,
        name: interviewee.name,
        email: interviewee.email,
        interviewDate: interviewee.interviewDate,
        resumePath: interviewee.resumePath,
        filterScores: interviewee.filterScores,
        questions: interviewee.questions,
        comments: interviewee.comments,
        isInterviewed: interviewee.isInterviewed,
        interviewDuration: interviewee.interviewDuration,
        isRoomOpened: interviewee.isRoomOpened,
        questionsNum: interviewee.questions?.length,
        commentAvgScore: getAverageScore(interviewee.comments),
        questionAvgScore: getAverageScore(interviewee.questions),
        filterAvgScores: getFilterAvgScors(interviewee.filterScores),
      },
    });
  }
);

router.delete(
  "/:project_id/interviewees/:interviewee_id",
  validate(projectIntervieweeIdParamsSchema, "params"),
  async (req, res, next) => {
    const session = await startSession();

    try {
      session.startTransaction();
      const { project_id: projectId, interviewee_id: intervieweeId } = req.params;

      await deleteCandidate({ projectId, intervieweeId }, session);

      const { deletedInterviewee } = await deleteInterviewee({ intervieweeId }, session);

      await session.commitTransaction();

      session.endSession();

      return res.json({
        result: "ok",
        data: deletedInterviewee,
      });
    } catch (error) {
      await session.abortTransaction();

      session.endSession();
      next(error);
    }
  }
);

module.exports = router;
