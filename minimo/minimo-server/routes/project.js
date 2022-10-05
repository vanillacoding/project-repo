const router = require('express').Router();
const createError = require('http-errors');
const Project = require('../models/Project');

router.get('/:address', async (req, res, next) => {
  try {
    let project = await Project.findOne({ address: req.params.address });
    console.error(project);
    if (!project) {
      next(createError(404, 'project by given address not found'));
      return;
    }

    res.json({ ok: true, data: project });
  } catch (error) {
    console.error(error);
    console.log('project');
    next(createError(500, 'Internal Server Error'));
  }
});

router.post('/', async (req, res, next) => {
  const { 
    category,
    concept,
    backgroundColor,
    blocks,
    address,
    creatorId,
  } = req.body;

  try {
    let project = await Project.create({
      creatorId,
      category,
      concept,
      backgroundColor,
      blocks,
      address,
    });

    res.json({ ok: true, data: project });
  } catch (error) {
    console.log(error);
    next(createError());
  }
});

module.exports = router;
