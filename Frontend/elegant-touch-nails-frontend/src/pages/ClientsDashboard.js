import React, { useState } from "react";
import AddClientsForm from "../components/Clients/AddClientsForm";
import AddAppointmentsForm from "../components/Appointments/AddAppointmentsForm";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";

import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";

export default function ClientsDashboard() {
  const [showAddClientsForm, setShowAddClientsForm] = useState(false);
  const [showAddAppointmentsForm, setShowAddAppointmentsForm] = useState(false);
  const [showAddPaymentsForm, setShowAddPaymentsForm] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clients Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <IconButton onClick={() => setShowAddClientsForm(true)}>
          <PersonAddIcon />
        </IconButton>

        <IconButton onClick={() => setShowAddAppointmentsForm(true)}>
          <CalendarMonthIcon />
        </IconButton>

        <IconButton onClick={() => setShowAddPaymentsForm(true)}>
          <PaymentIcon />
        </IconButton>
      </div>

      {showAddClientsForm && <AddClientsForm />}
      {showAddAppointmentsForm && <AddAppointmentsForm />}
      {showAddPaymentsForm && <AddPaymentsForm />}
    </div>
  );
}
