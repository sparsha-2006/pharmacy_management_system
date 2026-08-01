import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar({ title }) {
  return (
    <div className="navbar">
      <div>
        <h2>{title}</h2>
      </div>

      <div className="navbar-right">
        <FaBell className="icon" />
        <FaUserCircle className="icon profile" />
      </div>
    </div>
  );
}

export default Navbar;