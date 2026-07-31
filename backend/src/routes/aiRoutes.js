const express = require('express');
const router = express.Router();
const AIController = require('../controllers/aiController');
const { validateAiRecommendation } = require('../middleware/validation');
// API 7: AI Medicine Recommendation
router.post('/recommendations', validateAiRecommendation, AIController.getRecommendation);
module.exports = router;
