const Project = require('../models/Project');
const { GeneralServiceError } = require('../lib/error');

async function getProjects(req, res, next) {
  let projects;

  try {
    projects = await Project.find();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(projects);
}

async function postProject(req, res, next) {
  const name = req.params.project_name;
  const { origin } = req.body;
  let newProject;

  try {
    newProject = await new Project({
      name,
      origin,
    }).save();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(newProject);
}

module.exports = {
  getProjects,
  postProject
};
