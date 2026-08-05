import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import Charts from "../components/Charts";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    medicines: 0,
    orders: 0,
    revenue: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      try {
        const [medicineRes, orderRes, lowStockRes] = await Promise.all([
          api.get("/medicines", { signal: controller.signal }),
          api.get("/orders", { signal: controller.signal }),
          api.get("/inventory/low-stock", { signal: controller.signal }),
        ]);

        console.log("Medicines:", medicineRes.data);
        console.log("Orders:", orderRes.data);
        console.log("Low Stock:", lowStockRes.data);

        // Handle different API response formats
        const medicines =
          medicineRes.data.data ||
          medicineRes.data.medicines ||
          medicineRes.data ||
          [];

        const orders =
          orderRes.data.data ||
          orderRes.data.orders ||
          orderRes.data ||
          [];

        const lowStock =
          lowStockRes.data.data ||
          lowStockRes.data.lowStock ||
          lowStockRes.data ||
          [];

        const revenue = Array.isArray(orders)
          ? orders.reduce(
              (sum, order) => sum + Number(order.total_amount || order.total || 0),
              0
            )
          : 0;

        setStats({
          medicines: Array.isArray(medicines) ? medicines.length : 0,
          orders: Array.isArray(orders) ? orders.length : 0,
          revenue,
          lowStock: Array.isArray(lowStock) ? lowStock.length : 0,
        });
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          console.error("Dashboard Error:", err);
        }
      }
    };

    loadDashboard();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Dashboard" />

        <h1 style={{ marginBottom: "30px" }}>
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
            value={stats.medicines}
            color="#2563eb"
          />

          <DashboardCard
            title="Orders"
            value={stats.orders}
            color="#16a34a"
          />

          <DashboardCard
            title="Revenue"
            value={`₹${stats.revenue.toFixed(2)}`}
            color="#9333ea"
          />

          <DashboardCard
            title="Low Stock"
            value={stats.lowStock}
            color="#dc2626"
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <Charts />
        </div>

        
      </div>
    </>
  );
}

export default Dashboard;