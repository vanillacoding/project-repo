const express = require('express');
const router = express.Router();

const { loginAndIssueToken } = require('./controller/login.controller');
router.get('/', function (req, res, next) {
    res.send('hello');
});
router.post('/', loginAndIssueToken);

module.exports = router;
