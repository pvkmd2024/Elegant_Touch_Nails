import React from "react";
// import { AuthContext } from "../context/AuthContext";
import { Routes, Route } from "react-router-dom"; // Removed unused Navigate
import ProtectedRoute from "../routes/ProtectedRoute";
import LoginLandingPage from "../pages/LoginLandingPage";
import Unauthorized from "../pages/Unauthorized";
import Home from "../pages/Home";
import ClientsPage from "../pages/ClientsPage";
import ServicesPage from "../pages/ServicesPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import PaymentsPage from "../pages/PaymentsPage";
import StaffPage from "../pages/StaffPage";
import StaffSchedulePage from "../pages/StaffSchedulePage";
import ManagerDashboard from "../pages/ManagerDashboard";

const AppRoutes = () => {
  // const { role } = useContext(AuthContext);

  return (
    <>
      {/* Header with Title only */}
      <div>
 <h1 style={{  textAlign: "center" }}>Elegant Touch Nails</h1>
</div>
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginLandingPage />} />

        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
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
    </>
  );
};

export default AppRoutes;