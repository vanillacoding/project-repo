const MAX_NAME_LENGTH = 25;
const REQUIRED_NAME_FIELD = 'Project name is required.';
const NAME_LENGTH_OVER = `Project name should be between 1 and ${MAX_NAME_LENGTH} characters long.`;
const UNIQUE_NAME_FIELD = 'Project with the same name already exist. Project should have a unique name.';
const NAME_REGEX = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
const INVALID_NAME = 'Upper, lower and numeric characters with a single space in between words';

exports.validateProject = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { project_list: projectList } = req.user;

    if (!name || !name.trim()) {
      return res.status(400).json({ result: 'validation failed', message: REQUIRED_NAME_FIELD });
    }

    if (name.trim().length > MAX_NAME_LENGTH) {
      return res.status(400).json({ result: 'validation failed', message: NAME_LENGTH_OVER });
    }

    if (!NAME_REGEX.test(name.trim())) {
      return res.status(400).json({ result: 'validation failed', message: INVALID_NAME });
    }

    if (projectList && projectList.length > 0) {
      const isProjectNameUnique = projectList.every(project => project.name !== name);

      if (!isProjectNameUnique) {
        return res.status(400).json({ result: 'validation failed', message: UNIQUE_NAME_FIELD });
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ result: 'failed', err });
  }
};
