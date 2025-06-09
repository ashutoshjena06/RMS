import { Link } from "react-router-dom";
import "./home.css";

export function Home() {
  return (
    <div className="home-wrapper">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to RMS</h1>
          <p>
            Seamlessly manage resources, teams, and tools to boost productivity
            and minimize downtime.
          </p>
          <div className="btn-group">
            <Link to="/register" className="btn btn-outline-light">
              Register
            </Link>
            <Link to="/login" className="btn btn-light text-dark">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
