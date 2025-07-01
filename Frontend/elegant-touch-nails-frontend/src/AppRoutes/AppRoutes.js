import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import LoginPage from "../pages/LoginPage"
import Unauthorized from "../pages/Unauthorized";
import Home from "../pages/Home";
import ClientsPage from "../pages/ClientsPage";
import ServicesPage from "../pages/ServicesPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import PaymentsPage from "../pages/PaymentsPage";
import StaffPage from "../pages/StaffPage";
import StaffSchedulePage from "../pages/StaffSchedulePage";

const AppRoutes = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="center-heading">
          <h1>Elegant Touch Nails</h1>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
<Route path="/login" element={<LoginPage />} />

        <Route
          path="/clients"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ClientsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <StaffPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-schedule"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <StaffSchedulePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Staff"]}>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Staff"]}>
              <ServicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Client"]}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </div>
  );
};

export default AppRoutes;
