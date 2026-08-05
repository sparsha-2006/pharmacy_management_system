import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get("/medicines");

        setInventory(res.data.data);
      } catch (err) {
        console.error("Inventory Error:", err);
      }
    };

    fetchInventory();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Inventory" />

        <div className="card">
          <h2 style={{ marginBottom: "20px" }}>
            Medicine Inventory
          </h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.name}</td>
 <td
  style={{
    color:
      Number(item.stock) <= 20
        ? "#dc2626"
        : "#16a34a",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  {item.stock}
</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

export default Inventory;