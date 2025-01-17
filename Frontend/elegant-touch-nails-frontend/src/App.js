import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import ServicesPage from "./pages/ServicesPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PaymentsPage from "./pages/PaymentsPage";
import StaffPage from "./pages/StaffPage";
import StaffSchedulePage from "./pages/StaffSchedulePage";

const App = () => {
  return (
    <Router>
      <div>
        <div className="center-heading">
          <h1>Elegant Touch Nails</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li>
              <Link to="/payments">Payments</Link>
            </li>
            <li>
              <Link to="/staff">Staff</Link>
            </li>
            <li>
              <Link to="/staff-schedule">Staff Schedule</Link>
            </li>
          </ul>
        </nav>
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
    </Router>
  );
};

export default App;
