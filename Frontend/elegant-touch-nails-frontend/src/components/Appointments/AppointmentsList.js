import React, { useEffect, useState } from "react";
import { fetchAppointments } from "servicesdirectory/api"; // Import the fetch version of the function

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetchAppointments();
        console.log("Fetched appointments data:", response); // Debugging log
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await fetchAppointments(); // Call the new fetchAppointments function
  //       setAppointments(data);
  //     } catch (error) {
  //       setError("Failed to fetch appointments.");
  //       console.error("Error fetching appointments:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
              <tr key={appointment.iD}>
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
