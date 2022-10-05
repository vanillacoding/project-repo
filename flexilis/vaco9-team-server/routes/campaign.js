const express = require('express');
const campaignController = require('../controllers/campaign.controller');
const {
  createCampaignValidation,
  campaignStatsValidation,
} = require('../middlewares/validateInput');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, campaignController.getAdvertiserCampaigns);
router.get('/popup', verifyToken, campaignController.getCampaignPopUp);
router.post('/', verifyToken, createCampaignValidation, campaignController.createCampaign);
router.post('/estimate', verifyToken, campaignController.getEstimateStats);
router.patch('/stats', verifyToken, campaignStatsValidation, campaignController.updateCampaignStats);

module.exports = router;
