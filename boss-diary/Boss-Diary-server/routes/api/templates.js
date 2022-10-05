const router = require('express').Router();
const { ensureLoggedIn } = require('./middlewares/authentication');
const templateController = require('./controllers/template.controller');

router.get('/', ensureLoggedIn, templateController.getAll);

module.exports = router;
