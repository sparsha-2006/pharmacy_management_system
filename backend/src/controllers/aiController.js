const AIService = require('../services/aiService');
const { sendSuccess } = require('../utils/responseHandler');
class AIController {
  // API 7: AI Medicine Recommendation
  static async getRecommendation(req, res, next) {
    try {
      const { medicine_id, symptoms } = req.body;
      const recommendation = await AIService.getRecommendation({ medicine_id, symptoms });
      return sendSuccess(res, 'AI medicine recommendation generated successfully.', recommendation);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AIController;