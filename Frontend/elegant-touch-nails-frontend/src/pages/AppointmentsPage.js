import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../servicesdirectory/api";
import AppointmentsList from "../components/Appointments/AppointmentsList";
import AddAppointmentsForm from "../components/Appointments/AddAppointmentsForm";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <AddAppointmentsForm />
      <AppointmentsList appointments={appointments} />
    </div>
  );
};

export default AppointmentsPage;
