import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "30px",
          cursor: "pointer",
        }}
      >
        👤
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "45px",
            width: "180px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,.2)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => navigate("/profile")}
            style={menuStyle}
          >
            👤 My Profile
          </button>

          <button
            onClick={handleLogout}
            style={{ ...menuStyle, color: "red" }}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

const menuStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  background: "white",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "15px",
};