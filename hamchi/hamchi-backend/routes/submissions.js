const express = require('express');
const router = express.Router();
const SubmissionsController = require('../controllers/submissions.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/new', verifyToken, SubmissionsController.createSubmission);
router.get('/:userId', verifyToken, SubmissionsController.mySubmissions);
router.patch('/status', verifyToken, SubmissionsController.updateSubmissionStatus);

module.exports = router;
