import { useNavigate } from "react-router-dom";
import "./Profile.css";
const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
  <div className="profile-page">
  <div className="profile-card">

    <h1 className="profile-title">My Profile</h1>

    <div className="avatar">
       {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
    </div>

    <h2 className="profile-name">
      {user?.name || "Admin"}
    </h2>

    <p className="profile-role">
      {user?.role || "Administrator"}
    </p>

    <div className="profile-info">

      <div className="info-group">
        <p className="info-label">Email</p>
        <p className="info-value">
          {user?.email || "admin@gmail.com"}
        </p>
      </div>

      <div className="info-group">
        <p className="info-label">Role</p>
        <p className="info-value">
          {user?.role || "Administrator"}
        </p>
      </div>

    </div>

    <div className="button-group">

      <button
        className="dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </button>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Sign Out
      </button>

    </div>

  </div>
</div>
  )}
  export default Profile;