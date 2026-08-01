function DashboardCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        width: "220px",
        boxShadow: "0 10px 20px rgba(0,0,0,.15)",
      }}
    >
      <h3>{title}</h3>

      <h1 style={{ marginTop: 15 }}>{value}</h1>
    </div>
  );
}

export default DashboardCard;