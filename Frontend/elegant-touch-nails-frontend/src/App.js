import React, { useEffect, useState } from "react";
import "./App.css";
import {
  fetchClients,
  fetchServices,
  fetchAppointments,
  fetchPayments,
  fetchStaff,
  fetchStaffSchedules,
} from "servicesdirectory/api";

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

const App = () => {
  // State for Clients, Services, Appointments, Payments, Staff, and Staff Schedule
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [staffSchedules, setStaffSchedules] = useState([]);

  // Fetch data for Clients
  useEffect(() => {
    fetchClients().then((data) => setClients(data));
  }, []);

  // Fetch data for Services
  useEffect(() => {
    fetchServices().then((data) => setServices(data));
  }, []);

  // Fetch data for Appointments
  useEffect(() => {
    fetchAppointments().then((data) => setAppointments(data));
  }, []);

  // Fetch data for Payments
  useEffect(() => {
    fetchPayments().then((data) => setPayments(data));
  }, []);

  // Fetch data for Staff
  useEffect(() => {
    fetchStaff().then((data) => setStaff(data));
  }, []);

  // Fetch data for Staff Schedules
  useEffect(() => {
    fetchStaffSchedules().then((data) => setStaffSchedules(data));
  }, []);

  return (
    <div>
      <div className="center-heading">
        <h1>Elegant Touch Nails</h1>
      </div>

      <h2>Clients</h2>
      <AddClientForm />
      <ClientsList clients={clients} />

      <h2>Services</h2>
      <AddServiceForm />
      <ServicesList services={services} />

      <h2>Appointments</h2>
      <AddAppointmentForm />
      <AppointmentsList appointments={appointments} />

      <h2>Payments</h2>
      <AddPaymentForm />
      <PaymentsList payments={payments} />

      <h2>Staff</h2>
      <AddStaffForm />
      <StaffList staff={staff} />

      <h2>Staff Schedule</h2>
      <AddStaffScheduleForm />
      <StaffScheduleList staffSchedules={staffSchedules} />
    </div>
  );
};

export default App;

// import React from "react";
// import "./App.css";
// // Consolidated API imports
// import {
//   fetchClients,
//   fetchServices,
//   fetchAppointments,
//   fetchPayments,
//   fetchStaff,
//   fetchStaffSchedules,
// } from "servicesdirectory/api";

// // Component imports
// import ClientsList from "./components/Clients/ClientsList";
// import AddClientForm from "./components/Clients/AddClientForm";

// import ServicesList from "./components/Services/ServicesList";
// import AddServiceForm from "./components/Services/AddServiceForm";

// import AppointmentsList from "./components/Appointments/AppointmentsList";
// import AddAppointmentForm from "./components/Appointments/AddAppointmentForm";

// import PaymentsList from "./components/Payments/PaymentsList";
// import AddPaymentForm from "./components/Payments/AddPaymentForm";

// import StaffList from "./components/Staff/StaffList";
// import AddStaffForm from "./components/Staff/AddStaffForm";

// import StaffScheduleList from "./components/StaffSchedule/StaffScheduleList";
// import AddStaffScheduleForm from "./components/StaffSchedule/AddStaffScheduleForm";

// const App = () => (
//   <div>
//     <div className="center-heading">
//       <h1>Elegant Touch Nails</h1>
//     </div>
//     <h2>Clients</h2>
//     <AddClientForm />
//     <ClientsList />

//     <h2>Services</h2>
//     <AddServiceForm />
//     <ServicesList />

//     <h2>Appointments</h2>
//     <AddAppointmentForm />
//     <AppointmentsList />

//     <h2>Payments</h2>
//     <AddPaymentForm />
//     <PaymentsList />

//     <h2>Staff</h2>
//     <AddStaffForm />
//     <StaffList />

//     <h2>Staff Schedule</h2>
//     <AddStaffScheduleForm />
//     <StaffScheduleList />
//   </div>
// );

// export default App;
