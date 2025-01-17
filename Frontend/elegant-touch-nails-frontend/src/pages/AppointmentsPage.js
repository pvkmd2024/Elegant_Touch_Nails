import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../servicesdirectory/api";
import AppointmentsList from "../components/Appointments/AppointmentsList";
import AddAppointmentForm from "../components/Appointments/AddAppointmentForm";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <AddAppointmentForm />
      <AppointmentsList appointments={appointments} />
    </div>
  );
};

export default AppointmentsPage;
