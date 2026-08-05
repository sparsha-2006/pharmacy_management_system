import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AIRecommendation() {
  const [symptoms, setSymptoms] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!symptoms.trim()) {
      alert("Please enter symptoms.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/recommendations", {
        symptoms,
      });

      console.log("AI Response:", res.data);

      let output = "";

      if (res.data?.data?.raw_response) {
        output = res.data.data.raw_response;
      } else if (res.data?.data?.recommendation) {
        output = res.data.data.recommendation;
      } else if (res.data?.data?.usage_advice) {
        output = res.data.data.usage_advice;
      } else if (res.data?.message) {
        output = res.data.message;
      } else {
        output = JSON.stringify(res.data.data, null, 2);
      }

      setRecommendation(output);
    } catch (err) {
      console.error("AI Error:", err);

      if (err.response) {
        console.log(err.response.data);
      }

      setRecommendation(
        "Unable to generate AI recommendation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="AI Recommendation" />

        <div
          className="card"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            🤖 AI Medicine Recommendation
          </h2>

          <textarea
            rows={6}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter symptoms (Example: Fever, headache, cough)..."
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              resize: "none",
              boxSizing: "border-box",
              marginBottom: "20px",
            }}
          />

          <button
            type="button"
            onClick={askAI}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {recommendation && (
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "10px",
                background: "#f8fafc",
                border: "1px solid #d1d5db",
              }}
            >
              <h3 style={{ marginBottom: "15px", color: "#2563eb" }}>
                AI Recommendation
              </h3>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  margin: 0,
                }}
              >
                {recommendation}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AIRecommendation;