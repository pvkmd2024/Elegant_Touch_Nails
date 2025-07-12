import React, { useState } from "react";
import AddStaffForm from "../components/Staff/AddStaffForm";
import AddServicesForm from "../components/Services/AddServicesForm";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";

import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function ManagersDashboard() {
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showAddServicesForm, setShowAddServicesForm] = useState(false);
  const [showAddPaymentsForm, setShowAddPaymentsForm] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manager's Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <IconButton onClick={() => setShowAddStaffForm(true)}>
          <PeopleIcon />
        </IconButton>
        <IconButton onClick={() => setShowAddServicesForm(true)}>
          <DesignServicesIcon />
        </IconButton>
        <IconButton onClick={() => setShowAddPaymentsForm(true)}>
          <AttachMoneyIcon />
        </IconButton>
      </div>

      {showAddStaffForm && <AddStaffForm />}
      {showAddServicesForm && <AddServicesForm />}
      {showAddPaymentsForm && <AddPaymentsForm />}
    </div>
  );
}


// import React from "react";
// import { Link } from "react-router-dom";

// export default function ManagerDashboard() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>Salon Manager Dashboard</h2>
//       </div>
//       <ul>
//         <li><Link to="/clients">Manage Clients</Link></li>
//         <li><Link to="/staff">Manage Staff</Link></li>
//         <li><Link to="/staff-schedule">Manage Staff Schedule</Link></li>
//         <li><Link to="/appointments">Manage Appointments</Link></li>
//         <li><Link to="/services">Manage Services</Link></li>
//         <li><Link to="/payments">Manage Payments</Link></li>
//       </ul>
//     </div>
//   );
// }
