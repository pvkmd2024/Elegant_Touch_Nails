import React from "react";
import "./DashboardLayout.css";
import { Link } from "react-router-dom";

export default function ManagersDashboard () {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Manager's Dashboard</h1>
      </div>

      <ul>
        <li><Link to="/clients-form">➕ Add Client</Link></li>
          <li><Link to="/staff-form">➕ Add Staff</Link></li>
          <li><Link to="/staff-schedule-form">➕ Add Staff Schedule</Link></li>
          <li><Link to="/appointments-form">➕ Book Appointment</Link></li>
          <li><Link to="/services-form">➕ Add Service</Link></li>
          <li><Link to="/payments-form">➕ Record Payment</Link></li>
      </ul>
    </div>
  );
};
