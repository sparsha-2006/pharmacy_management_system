import "./Navbar.css";
import { FaBell } from "react-icons/fa";
import ProfileDropdown from "../components/ProfileDropdown";
function Navbar({ title }) {
  return (
    <div className="navbar">
      <div>
        <h2>{title}</h2>
      </div>

      <div className="navbar-right">
        <div className="top-icons">
          <FaBell className="icon" />

           <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;