import React from "react";
import LogoutButton from "../components/LogoutButton";
import "./DashboardLayout.css";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const StaffDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Navigation />
        <h1>Staff Dashboard</h1>
        <LogoutButton />
      </div>

      <ul>
        <li>
          <Link to="/services-list">
            View Services
          </Link>
        </li>
        <li>
          <Link to="/appointments-list">
            View Appointments
          </Link>
        </li>
        <li>
          <Link to="/staff-list">
            View Staff
          </Link>
        </li>
        <li>
          <Link to="/payments-form" state={{ isLimitedView: true }}>
            Process Payment
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StaffDashboard;
