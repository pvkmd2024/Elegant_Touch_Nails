import React, { useState } from "react";
import { createAppointment } from "servicesdirectory/api";

const AddAppointmentForm = () => {
  const [ClientID, setClientID] = useState("");
  const [ServiceID, setServiceID] = useState("");
  const [AppointmentDate, setAppointmentDate] = useState("");
  const [Status, setStatus] = useState("");
  const [error, setError] = useState(""); // Track error messages
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Input validation
    if (!ClientID || !ServiceID || !AppointmentDate || !Status) {
      setError("All fields are required.");
      return;
    }

    const appointmentData = { ClientID, ServiceID, AppointmentDate, Status };

    setLoading(true); // Set loading state to true when the request starts
    setError(""); // Reset error message

    createAppointment(appointmentData)
      .then(() => {
        alert("Appointment added successfully!");
        setClientID("");
        setServiceID("");
        setAppointmentDate("");
        setStatus("");
      })
      .catch((error) => {
        setError("Failed to add appointment. Please try again.");
        console.error("Error adding appointment:", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state when the request finishes
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Appointment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <input
        type="text"
        placeholder="Client ID"
        value={ClientID}
        onChange={(e) => setClientID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Service ID"
        value={ServiceID}
        onChange={(e) => setServiceID(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Appointment Date"
        value={AppointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />
      <select value={Status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Appointment"}
      </button>
    </form>
  );
};

export default AddAppointmentForm;
