const { getGeminiClient, getGeminiModelName } = require('../config/gemini');
const MedicineModel = require('../models/medicineModel');
class AIService {
  static async getRecommendation({ medicine_id, symptoms }) {
    let targetMedicine = null;
    let availableMedicines = await MedicineModel.findAll();
    if (medicine_id) {
      targetMedicine = await MedicineModel.findById(medicine_id);
    }
    const aiClient = getGeminiClient();
    const modelName = getGeminiModelName();
if (aiClient) {
      try {
        let prompt = '';
        const medicineCatalogText = availableMedicines
          .map(m => `- ID: ${m.id}, Name: ${m.name}, Category: ${m.category}, Stock: ${m.stock}, Price: $${m.price}, Description: ${m.description}`)
          .join('\n');
            if (targetMedicine) {
          prompt = `You are a professional Pharmacy AI Consultant.
The user is asking for recommendations or alternatives for the following medicine:
Medicine ID: ${targetMedicine.id}
Name: ${targetMedicine.name}
Category: ${targetMedicine.category}
Price: $${targetMedicine.price}
Description: ${targetMedicine.description}
Here is our current pharmacy inventory catalog:
${medicineCatalogText}
Provide a structured JSON response with:
1. "target_medicine": Brief details of the requested medicine.
2. "recommendations": An array of 2-3 recommended alternative or related medicines from our catalog or general medical knowledge.
3. "usage_advice": Key safety guidelines and dosage precautions.
4. "disclaimer": Medical advice disclaimer.`;
        } else {
          prompt = `You are a professional Pharmacy AI Consultant.
A user reported the following symptoms: "${symptoms}".
Here is our current pharmacy inventory catalog:
${medicineCatalogText}
Provide a structured JSON response with:
1. "analyzed_symptoms": Summary of symptoms.
2. "recommendations": Recommended medicines from our catalog suitable for treating these symptoms.
3. "usage_advice": Precautions, recommended dosage, and when to consult a doctor.
4. "disclaimer": Medical advice disclaimer.`;
        }
       const response = await aiClient.models.generateContent({
  model: modelName,
  contents: prompt,
});

console.log("===== GEMINI RESPONSE =====");
console.dir(response, { depth: null });

const textOutput =
  typeof response.text === "function"
    ? response.text()
    : response.text || JSON.stringify(response);

return {
  ai_provider: "Google Gemini AI",
  model: modelName,
  raw_response: textOutput,
};
      } catch (err) {
        
        console.warn(`[Gemini AI Call Failed] ${err.message}. Falling back to Rule-Based Recommendation Engine.`);
      }
    }
    // Rule-Based Fallback Engine
    return this.getRuleBasedRecommendation(targetMedicine, symptoms, availableMedicines);
  }
  static getRuleBasedRecommendation(targetMedicine, symptoms, catalog) {
    if (targetMedicine) {
      const alternatives = catalog.filter(m => 
        m.category.toLowerCase() === targetMedicine.category.toLowerCase() && m.id !== targetMedicine.id
      );
      return {
        ai_provider: 'Rule-Based Fallback Engine (Add GEMINI_API_KEY for GenAI responses)',
        target_medicine: {
          id: targetMedicine.id,
          name: targetMedicine.name,
          category: targetMedicine.category
        },
         recommended_alternatives: alternatives.length > 0 ? alternatives.map(m => ({
          id: m.id,
          name: m.name,
          category: m.category,
          price: m.price,
          in_stock: m.stock > 0
        })) : catalog.slice(0, 3).map(m => ({
          id: m.id,
          name: m.name,
          category: m.category,
          price: m.price,
          in_stock: m.stock > 0
        })),
        usage_advice: 'Consult a qualified pharmacist or medical professional before substituting medications.',
        disclaimer: 'This recommendation is generated for informational purposes only and does not replace medical advice.'
      };
    } else {
      const matched = catalog.filter(m => {
        const query = (symptoms || '').toLowerCase();
        return (
          m.name.toLowerCase().includes(query) ||
          m.category.toLowerCase().includes(query) ||
          (m.description && m.description.toLowerCase().includes(query))
        );
      });
      const results = matched.length > 0 ? matched : catalog.slice(0, 3);
      return {
        ai_provider: 'Rule-Based Fallback Engine (Add GEMINI_API_KEY for GenAI responses)',
        input_symptoms: symptoms,
        recommended_medicines: results.map(m => ({
          id: m.id,
          name: m.name,
          category: m.category,
          price: m.price,
          description: m.description,
          in_stock: m.stock > 0
        })),
        usage_advice: 'If symptoms persist for more than 48 hours or worsen, seek immediate medical attention.',
        disclaimer: 'This recommendation is generated for informational purposes only and does not replace professional diagnosis.'
      };
    }
  }
}
module.exports = AIService;