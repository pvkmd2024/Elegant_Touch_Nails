import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../services/api";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    setLoading(true);
    fetchAppointments()
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch appointments.");
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      {loading && <p>Loading appointments...</p>} {/* Show loading message */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Service ID</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.ClientID}</td>
                <td>{appointment.ServiceID}</td>
                <td>
                  {new Date(appointment.AppointmentDate).toLocaleString()}
                </td>
                <td>{appointment.Status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
