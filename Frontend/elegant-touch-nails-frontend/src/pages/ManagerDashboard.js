// src/pages/ManagerDashboard.js
import React from "react";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Salon Manager Dashboard</h2>
      </div>
      <ul>
        <li><Link to="/clients">Manage Clients</Link></li>
        <li><Link to="/staff">Manage Staff</Link></li>
        <li><Link to="/staff-schedule">Manage Staff Schedule</Link></li>
        <li><Link to="/appointments">Manage Appointments</Link></li>
        <li><Link to="/services">Manage Services</Link></li>
        <li><Link to="/payments">Manage Payments</Link></li>
      </ul>
    </div>
  );
}
