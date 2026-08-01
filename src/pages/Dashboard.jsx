import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import LowStockWidget from "../components/LowStockWidget";
import Charts from "../components/Charts";


function Dashboard() {
  return (
    <>
      <Sidebar />

      <div className="page">

        <Navbar title="Dashboard" />

        <h1 style={{ marginBottom: 30 }}>
          Welcome Admin 👋
        </h1>

        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          <DashboardCard
            title="Total Medicines"
            value="540"
            color="#2563eb"
          />

          <DashboardCard
            title="Orders"
            value="128"
            color="#16a34a"
          />

          <DashboardCard
            title="Revenue"
            value="₹1,45,000"
            color="#9333ea"
          />

          <DashboardCard
            title="Low Stock"
            value="18"
            color="#dc2626"
          />
        </div>

      </div>
    </>
  );
}

export default Dashboard;