import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIChat from "../components/AIChat";

function AIRecommendation() {
  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="AI Recommendation" />

        <AIChat />
      </div>
    </>
  );
}

export default AIRecommendation;