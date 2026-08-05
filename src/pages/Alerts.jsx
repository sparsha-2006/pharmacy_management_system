import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/inventory/low-stock");

        console.log("API Response:", res.data);

        setAlerts(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Alerts" />

        <div className="card">
          <h2
            style={{
              color: "#dc2626",
              marginBottom: "20px",
            }}
          >
            ⚠ Low Stock Medicines
          </h2>

          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Remaining Stock</th>
              </tr>
            </thead>

            <tbody>
              {alerts.length > 0 ? (
                alerts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>

                    <td
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {item.stock}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No low stock medicines.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Alerts;