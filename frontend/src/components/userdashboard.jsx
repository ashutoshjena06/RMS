import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AdminProfile } from "./profile";
import { UserManagement } from "./usermanagement";

export function UserDashboard() {
  const [cookies, , removeCookie] = useCookies(["email"]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("dashboard");

  const handleLogout = () => {
    removeCookie("email");
    navigate("/login");
  };

  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return <h2>Welcome to the User Dashboard</h2>;
      case "Users":
        return <UserManagement />;
      case "profile":
        return <AdminProfile />;
      default:
        return <h2>Select an option from the menu</h2>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        className="bg-success text-white p-4"
        style={{
          width: "250px",
          height: "calc(100vh - 60px)",
          position: "fixed",
          top: "60px", // match header height
          left: 0,
          overflowY: "auto",
        }}
      >
        <h4 className="mb-4">User Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`btn text-start w-100 text-white ${
                selected === "dashboard" ? "bg-secondary" : ""
              }`}
              onClick={() => setSelected("dashboard")}
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </button>
          </li>
          <li className="nav-item mt-2">
            <button
              className={`btn text-start w-100 text-white ${
                selected === "Users" ? "bg-secondary" : ""
              }`}
              onClick={() => setSelected("Users")}
            >
              <FaUsers className="me-2" />
              All Users
            </button>
          </li>
          <li className="nav-item mt-2">
            <button
              className={`btn text-start w-100 text-white ${
                selected === "profile" ? "bg-secondary" : ""
              }`}
              onClick={() => setSelected("profile")}
            >
              <FaUserCircle className="me-2" />
              Profile
            </button>
          </li>
          <li className="nav-item mt-4">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
      {/* Main content wrapper */}
      <div
        style={{
          marginLeft: "250px",
          marginTop: "100px", // offset header height
          width: "100%",
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
