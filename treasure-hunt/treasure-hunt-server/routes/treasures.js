const express = require('express');
const router = express.Router();
const treasureControleer = require('../controller/treasure.controller');
const ensureAuthenticated = require('../middlewares/authorization');
const { uploadImg } = require('../middlewares/uploadImg');

router.get('/', ensureAuthenticated, treasureControleer.getTreasures);
router.post('/', ensureAuthenticated, uploadImg.array('img', 3), treasureControleer.saveTreasures);
router.get('/:treasure_id', ensureAuthenticated, treasureControleer.getSelectedTreasure);
router.put('/:treasure_id', ensureAuthenticated, treasureControleer.updateTreasure);
router.delete('/:treasure_id', ensureAuthenticated, treasureControleer.deleteTreasure);

module.exports = router;
