import React, { useState } from "react";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";

import IconButton from "@mui/material/IconButton";
import PaymentIcon from "@mui/icons-material/Payment";

export default function StaffDashboard() {
  const [showAddPaymentsForm, setShowAddPaymentsForm] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Staff Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <IconButton onClick={() => setShowAddPaymentsForm(true)}>
          <PaymentIcon />
        </IconButton>
      </div>

      {showAddPaymentsForm && <AddPaymentsForm />}
    </div>
  );
}
