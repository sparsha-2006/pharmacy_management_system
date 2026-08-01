import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LowStockWidget from "../components/LowStockWidget";

function Alerts() {
  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Alerts" />

        <LowStockWidget />
      </div>
    </>
  );
}

export default Alerts;