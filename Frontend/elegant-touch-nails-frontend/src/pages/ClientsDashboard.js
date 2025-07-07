import React from "react";
import LogoutButton from "../components/LogoutButton"; 
import "./DashboardLayout.css";
import { Link } from "react-router-dom";
import Navigation from "components/Navigation";

const ClientsDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Navigation />
        <h1>Clients Dashboard</h1>
        <LogoutButton />
      </div>

      <ul>
        <li>
          <Link to="/clients-form" state={{ isLimitedView: true }}>
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/services-list">
            View Services
          </Link>
        </li>
        <li>
          <Link to="/appointments-form" state={{ isLimitedView: true }}>
            Book An Appointment
          </Link>
        </li>
        <li>
          <Link to="/payments-form" state={{ isLimitedView: true }}>
            Make Payment
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ClientsDashboard;
