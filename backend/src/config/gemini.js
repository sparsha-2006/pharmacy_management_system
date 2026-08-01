const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

let aiInstance = null;

if (apiKey && apiKey !== "your_gemini_api_key_here") {
  try {
    aiInstance = new GoogleGenAI({
      apiKey,
    });

    console.log(
      `[Gemini AI] Initialized successfully with model "${modelName}"`
    );
  } catch (err) {
    console.warn(
      `[Gemini AI Warning] Failed to initialize: ${err.message}`
    );
  }
} else {
  console.log(
    "[Gemini AI] GEMINI_API_KEY not configured. Rule-based recommendations will be used."
  );
}

const getGeminiClient = () => aiInstance;

const getGeminiModelName = () => modelName;

const isGeminiEnabled = () => aiInstance !== null;

module.exports = {
  getGeminiClient,
  getGeminiModelName,
  isGeminiEnabled,
};
