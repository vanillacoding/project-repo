const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants.controller');
const verifyToken = require('../middlewares/authorization');

router.get('/', verifyToken, plantsController.getAllPlantsById);
router.get('/popular', plantsController.getMostPopularPlants);
router.post('/new', verifyToken, plantsController.createNewPlant);
router.put('/:plantId', verifyToken, plantsController.updatePlant);
router.put('/', verifyToken, plantsController.updatePlantAll);
router.delete('/:plantId', verifyToken, plantsController.deletePlant);

module.exports = router;
