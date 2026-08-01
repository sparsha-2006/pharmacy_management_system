const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

let aiClient = null;

try {
  if (apiKey && apiKey.trim() !== "" && apiKey !== "your_gemini_api_key") {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
    });

    console.log(
      `[Gemini AI] Initialized successfully with model "${modelName}"`
    );
  } else {
    console.warn(
      "[Gemini AI] No valid GEMINI_API_KEY found. Rule-based recommendations will be used."
    );
  }
} catch (err) {
  console.error("[Gemini AI] Initialization Failed:");
  console.error(err);
}

const getGeminiClient = () => aiClient;

const getGeminiModelName = () => modelName;

const isGeminiEnabled = () => aiClient !== null;

module.exports = {
  getGeminiClient,
  getGeminiModelName,
  isGeminiEnabled,
};