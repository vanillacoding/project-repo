const express = require('express');

const router = express.Router();

const repoUrlValidator = require('../middlewares/repoUrlValidator');

const controller = require('./controller/repository.controller');

router.get('/diff', controller.getDiffData);
router.get('/', repoUrlValidator, controller.getRepoData);

module.exports = router;
