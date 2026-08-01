import { FaUser, FaMoneyBillWave, FaBox } from "react-icons/fa";

function OrderCard({ order }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ color: "#2563eb" }}>Order #{order.id}</h3>

      <p>
        <FaUser /> <b>Customer:</b> {order.customer}
      </p>

      <p>
        <FaBox /> <b>Medicine:</b> {order.medicine}
      </p>

      <p>
        Quantity: {order.quantity}
      </p>

      <p>
        <FaMoneyBillWave /> ₹{order.total}
      </p>

      <span
        style={{
          color: order.status === "Delivered" ? "green" : "orange",
          fontWeight: "bold",
        }}
      >
        {order.status}
      </span>
    </div>
  );
}

export default OrderCard;