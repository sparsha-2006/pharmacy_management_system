import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    if (!question.trim()) return;

    // Dummy AI response (replace with backend API later)
    setResponse(
      "Based on inventory and order history, Paracetamol and Dolo 650 are the most recommended medicines. Please consult a doctor before prescribing alternatives."
    );

    setQuestion("");
  };

  return (
    <div className="card">

      <h2 style={{ marginBottom: 20 }}>
        <FaRobot /> AI Medicine Recommendation
      </h2>

      <textarea
        rows="4"
        placeholder="Enter symptoms or medicine name..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 10,
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <button
        className="btn-primary"
        onClick={handleAsk}
        style={{ marginTop: 20 }}
      >
        <FaPaperPlane /> Ask AI
      </button>

      {response && (
        <div
          style={{
            marginTop: 30,
            background: "#eef5ff",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <strong>AI Response</strong>

          <p style={{ marginTop: 10 }}>
            {response}
          </p>
        </div>
      )}
    </div>
  );
}

export default AIChat;