const express = require("express");

const { searchByEmail } = require("../../services/interviewerService");
const {
  getMyProjects,
  getJoinedProjects,
} = require("../../services/projectService");
const {
  searchInterviewersQuerySchema,
  userIdParamsSchema,
} = require("../../utils/validationSchema");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get(
  "/:user_id/my_projects",
  validate(userIdParamsSchema, "params"),
  async (req, res, next) => {
    try {
      const interviewerId = req.user._id;
      const { myProjects } = await getMyProjects(interviewerId);

      const myProjectsFormat = myProjects.map((myProject) => ({
        id: myProject._id,
        title: myProject.title,
        filters: myProject.filters,
        participants: myProject.participants,
        creator: myProject.creator,
        candidateNum: myProject.candidates.length,
        createAt: myProject.createdAt,
        category: myProject.category,
      }));

      return res.json({
        result: "ok",
        data: myProjectsFormat,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:user_id/joined_projects",
  validate(userIdParamsSchema, "params"),
  async (req, res, next) => {
    try {
      const interviewerId = req.user._id;
      const { joinedProjects } = await getJoinedProjects(interviewerId);

      const joinedProjectFormat = joinedProjects.map((joinedProject) => ({
        id: joinedProject._id,
        title: joinedProject.title,
        filters: joinedProject.filters,
        participants: joinedProject.participants,
        creator: joinedProject.creator,
        candidateNum: joinedProject.candidates.length,
        createAt: joinedProject.createdAt,
        category: joinedProject.category,
      }));

      return res.json({
        result: "ok",
        data: joinedProjectFormat,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/search",
  validate(searchInterviewersQuerySchema, "query"),
  async (req, res, next) => {
    try {
      const { emailSearchList } = await searchByEmail(req.query.email);

      const refinedEmailSearchList = emailSearchList.map((searchItem) => ({
        id: searchItem._id,
        name: searchItem.username,
        email: searchItem.email,
      }));

      return res.json({
        result: "ok",
        data: refinedEmailSearchList,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
