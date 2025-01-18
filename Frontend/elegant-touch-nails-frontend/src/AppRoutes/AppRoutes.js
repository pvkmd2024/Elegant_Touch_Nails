import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "../pages/ClientsPage";
import ServicesPage from "../pages/ServicesPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import PaymentsPage from "../pages/PaymentsPage";
import StaffPage from "../pages/StaffPage";
import StaffSchedulePage from "../pages/StaffSchedulePage";

const AppRoutes = () => {
  return (
    <div>
      <div className="center-heading">
        <h1>Elegant Touch Nails</h1>
      </div>

      <Routes>
        <Route path="/" element={<ClientsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff-schedule" element={<StaffSchedulePage />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
