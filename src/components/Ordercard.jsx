import { FaUser, FaMoneyBillWave } from "react-icons/fa";

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
      <h3 style={{ color: "#2563eb" }}>
        Order #{order.id}
      </h3>

      <p>
        <FaUser /> <b>User ID:</b> {order.user_id}
      </p>

      <p>
        <FaMoneyBillWave /> <b>Total:</b> ₹{order.total_amount}
      </p>

      <p>
        <b>Status:</b>{" "}
        <span
          style={{
            color:
              order.status === "COMPLETED"
                ? "green"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {order.status}
        </span>
      </p>
    </div>
  );
}

export default OrderCard;