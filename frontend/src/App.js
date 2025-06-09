import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Dashboard } from "./components/admindashboard";
import { ResetPassword } from "./components/resetpassword";
import { ProtectedRoute } from "./components/protectedroute";
import { UserDashboard } from "./components/userdashboard";
import { EditUserManagement } from "./components/editUserManagement";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Fixed Header */}
        <header
          className="bg-info shadow-sm"
          style={{ position: "fixed", width: "100%", zIndex: 1000 }}
        >
          <div className="container d-flex align-items-center justify-content-between py-3 px-1 px-md-0">
            <Link
              to="https://raagvitech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-brand fw-bold text-white text-decoration-none"
            >
              RaagviTech
            </Link>

            <h1 className="h3 text-white text-center flex-grow-1 mx-0 mx-md-3 my-2 my-md-0 fw-bold pe-5">
              Resource Management System
            </h1>
          </div>
        </header>

        {/* Scrollable Main */}
        <main
          className="container my-4 px-3 px-md-0"
          style={{ marginTop: "100px", flex: 1, overflowY: "auto" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route
              path="admindashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="userdashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="editUser"
              element={
                <ProtectedRoute>
                  <EditUserManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
