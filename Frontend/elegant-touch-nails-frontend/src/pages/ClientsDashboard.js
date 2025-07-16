import React, { useState } from "react";
import AddClientsForm from "../components/Clients/AddClientsForm";
import AddAppointmentsForm from "../components/Appointments/AddAppointmentsForm";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";

import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";

export default function ClientsDashboard() {
  const [activeForm, setActiveForm] = useState("clients"); // default is clients

  const handleFormChange = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clients Dashboard</h2>

      {/* Navigation Icons */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <IconButton onClick={() => handleFormChange("clients")} title="Client Form">
          <PersonAddIcon color={activeForm === "clients" ? "primary" : "action"} />
        </IconButton>

        <IconButton onClick={() => handleFormChange("appointments")} title="Appointments Form">
          <CalendarMonthIcon color={activeForm === "appointments" ? "primary" : "action"} />
        </IconButton>

        <IconButton onClick={() => handleFormChange("payments")} title="Payments Form">
          <PaymentIcon color={activeForm === "payments" ? "primary" : "action"} />
        </IconButton>
      </div>

      {/* Conditional Form Rendering */}
      {activeForm === "clients" && <AddClientsForm />}
      {activeForm === "appointments" && <AddAppointmentsForm />}
      {activeForm === "payments" && <AddPaymentsForm />}
    </div>
  );
}
