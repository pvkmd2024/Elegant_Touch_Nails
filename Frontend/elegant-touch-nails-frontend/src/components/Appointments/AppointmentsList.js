import React, { useEffect, useState } from "react";
import { fetchAppointments } from "servicesdirectory/api"; 
import styles from "./AppointmentsList.module.css"; 

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetchAppointments();
        console.log("Fetched appointments data:", response);
        setAppointments(response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };
    getAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(appointments)) return <div>Invalid data format.</div>;

  return (
    <div className={styles.appointmentsContainer}>
      <h2 className={styles.pageHeading}>Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>AppointmentID</th>
              <th>ClientID</th>
              <th>ServiceID</th>
              <th>AppointmentDate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.AppointmentID}>
                <td data-label="AppointmentID">{appt.AppointmentID}</td>
                <td data-label="ClientID">{appt.ClientID}</td>
                <td data-label="ServiceID">{appt.ServiceID}</td>
                <td data-label="AppointmentDate">{appt.AppointmentDate.slice(0,10)}</td>
                <td data-label="Status">{appt.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsList;
