import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        const res = await api.get("/orders");

        console.log(res.data);

        const orderList = res.data.data || res.data;

        if (!cancelled) {
          setOrders(orderList);
        }
      } catch (err) {
        console.error("Orders Error:", err);
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Orders" />

        <h1 style={{ marginBottom: 25 }}>
          Customer Orders
        </h1>

        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>
    </>
  );
}