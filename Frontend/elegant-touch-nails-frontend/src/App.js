import React from "react";

// Consolidated API imports
import {
  fetchClients,
  fetchServices,
  fetchAppointments,
  fetchPayments,
  fetchStaff,
  fetchStaffSchedules,
} from "../services/api";

// Component imports
import ClientsList from "./components/Clients/ClientsList";
import AddClientForm from "./components/Clients/AddClientForm";

import ServicesList from "./components/Services/ServicesList";
import AddServiceForm from "./components/Services/AddServiceForm";

import AppointmentsList from "./components/Appointments/AppointmentsList";
import AddAppointmentForm from "./components/Appointments/AddAppointmentForm";

import PaymentsList from "./components/Payments/PaymentsList";
import AddPaymentForm from "./components/Payments/AddPaymentForm";

import StaffList from "./components/Staff/StaffList";
import AddStaffForm from "./components/Staff/AddStaffForm";

import StaffScheduleList from "./components/StaffSchedule/StaffScheduleList";
import AddStaffScheduleForm from "./components/StaffSchedule/AddStaffScheduleForm";

const App = () => (
  <div>
    <h1>Elegant Touch Nails</h1>

    <h2>Clients</h2>
    <AddClientForm />
    <ClientsList />

    <h2>Services</h2>
    <AddServiceForm />
    <ServicesList />

    <h2>Appointments</h2>
    <AddAppointmentForm />
    <AppointmentsList />

    <h2>Payments</h2>
    <AddPaymentForm />
    <PaymentsList />

    <h2>Staff</h2>
    <AddStaffForm />
    <StaffList />

    <h2>Staff Schedule</h2>
    <AddStaffScheduleForm />
    <StaffScheduleList />
  </div>
);

export default App;
