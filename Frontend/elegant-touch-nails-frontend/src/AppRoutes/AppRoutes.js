import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route } from "react-router-dom"; // Removed unused Navigate
import ProtectedRoute from "../routes/ProtectedRoute";
import LoginLandingPage from "../pages/LoginLandingPage";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
// import Home from "../pages/Home";
import AddClientsForm from "../components/Clients/AddClientsForm";
import ClientsList from "../components/Clients/ClientsList"; // Assuming this is a component for listing clients
import AddStaffForm from "../components/Staff/AddStaffForm";
import StaffList from "../components/Staff/StaffList";
import AddAppointmentsForm from "../components/Appointments/AddAppointmentsForm";
import AppointmentsList from "../components/Appointments/AppointmentsList";
import AddServicesForm from "../components/Services/AddServicesForm";
import ServicesList from "../components/Services/ServicesList";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";
import PaymentsList from "../components/Payments/PaymentsList"; // Assuming this is a component for listing payments
import AddStaffScheduleForm from "../components/StaffSchedule/AddStaffScheduleForm";
import StaffScheduleList from "../components/StaffSchedule/StaffScheduleList"; // Assuming this is a component for listing staff schedules
import ManagersDashboard from "../pages/ManagersDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import ClientsDashboard from "../pages/ClientsDashboard";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
  console.log("AppRoutes rendering");
  const { authState, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Or a spinner
  console.log("Auth State:", authState);

  return (
    <>
      {/* Header with Title only */}
      <div>
        <h1 style={{ textAlign: "left", marginLeft: "20px" }}>
  Elegant Touch Nails
</h1>

      </div>
      {/* Main Routes */}
      <Routes>
        <Route
          path="/"
          element={
            authState.isAuthenticated ? (
              authState.role === "Manager" ? (
                <Navigate to="/managers-dashboard" />
              ) : authState.role === "Staff" ? (
                <Navigate to="/staff-dashboard" />
              ) : (
                <Navigate to="/clients-dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginLandingPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/managers-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagersDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients-form"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Client"]}>
              <AddClientsForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients-list"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Staff"]}>
              <ClientsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-form"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <AddStaffForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-list"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <StaffList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments-form"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Client"]}>
              <AddAppointmentsForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments-list"
          element={
            <ProtectedRoute allowedRoles={["Staff", "Manager"]}>
              <AppointmentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services-form"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <AddServicesForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services-list"
          element={
            <ProtectedRoute allowedRoles={["Client", "Manager", "Staff"]}>
              <ServicesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments-form"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Staff", "Client"]}>
              <AddPaymentsForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments-list"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <PaymentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-schedule-form"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <AddStaffScheduleForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-schedule-list"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Staff"]}>
              <StaffScheduleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Client"]}>
              <ClientsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
};

export default AppRoutes;