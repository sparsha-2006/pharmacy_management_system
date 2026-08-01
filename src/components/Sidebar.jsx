import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCapsules,
  FaPlusCircle,
  FaBoxes,
  FaShoppingCart,
  FaRobot,
  FaChartBar,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h1 className="logo">💊 PharmaFlow</h1>

      <NavLink to="/dashboard">
        <FaHome /> Dashboard
      </NavLink>

      <NavLink to="/medicines">
        <FaCapsules /> Medicines
      </NavLink>

      <NavLink to="/add-medicine">
        <FaPlusCircle /> Add Medicine
      </NavLink>

      <NavLink to="/inventory">
        <FaBoxes /> Inventory
      </NavLink>

      <NavLink to="/orders">
        <FaShoppingCart /> Orders
      </NavLink>

      <NavLink to="/alerts">
        <FaExclamationTriangle /> Alerts
      </NavLink>

      <NavLink to="/ai">
        <FaRobot /> AI Assistant
      </NavLink>

      <NavLink to="/analytics">
        <FaChartBar /> Analytics
      </NavLink>

    </div>
  );
}

export default Sidebar;