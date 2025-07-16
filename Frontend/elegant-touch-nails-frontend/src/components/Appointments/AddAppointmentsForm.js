import React, { useState, useRef } from "react";
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "servicesdirectory/api";
import { useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext"; 
import styles from "./AppointmentsForm.module.css";

const AddAppointmentsForm = () => {
  const location = useLocation();
  const formRef = useRef(null);
  const { authState } = useAuth();
  console.log("Logged-in user:", authState.user);
  const isClient = authState.role === "Client"; 
  const isLimitedView = location.state?.isLimitedView ?? isClient; 

  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [ClientID, setClientID] = useState("");
  const [ServiceID, setServiceID] = useState("");
  const [AppointmentDate, setAppointmentDate] = useState("");
  const [Status, setStatus] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
      setShowAppointments(true);
    } catch (error) {
      console.error("Failed to fetch appointments:", error.message);
    }
  };

  const unloadData = () => {
    setAppointments([]);
    setShowAppointments(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setClientID("");
    setServiceID("");
    setAppointmentDate("");
    setStatus("");
  };

  const formatDateTimeForMySQL = (datetimeLocal) => {
    return datetimeLocal ? datetimeLocal.replace("T", " ") + ":00" : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      ClientID,
      ServiceID,
      AppointmentDate: formatDateTimeForMySQL(AppointmentDate),
      Status,
    };

    try {
      if (editingId) {
        await updateAppointment(editingId, appointment);
        alert("Appointment updated successfully.");
      } else {
        await createAppointment(appointment);
        alert("Appointment booked successfully.");
      }
      await fetchData();
      resetForm();
    } catch (err) {
      console.error("Failed to submit appointment:", err.message);
      alert("Failed to submit appointment.");
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.AppointmentID);
    setClientID(appointment.ClientID);
    setServiceID(appointment.ServiceID);

    const formattedDate = appointment.AppointmentDate
      ? appointment.AppointmentDate.replace(" ", "T").slice(0, 16)
      : "";

    setAppointmentDate(formattedDate);
    setStatus(appointment.Status);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await deleteAppointment(id);
      alert("Appointment deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className={styles.appointmentsFormContainer} ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Book"} An Appointment</h2>

        {editingId && (
          <div>
            <label>Appointment ID</label>
            <input type="text" value={editingId} readOnly />
          </div>
        )}

        <input
          type="text"
          placeholder="Client ID"
          value={ClientID}
          onChange={(e) => setClientID(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Service ID"
          value={ServiceID}
          onChange={(e) => setServiceID(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={AppointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        <select value={Status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className={styles.actionButtons}>
          <button className={styles.addAppointmentBtn} type="submit">
            {editingId ? "Update" : "Add"}
          </button>

          {!isLimitedView && (
            <>
              <button className={styles.loadAppointmentsBtn} type="button" onClick={fetchData}>
                Load
              </button>
              <button className={styles.unloadAppointmentsBtn} type="button" onClick={unloadData}>
                Unload
              </button>
             
            </>
          )}
           <button className={styles.clearBtn} type="button" onClick={resetForm}>
                Clear
              </button>
        </div>
      </form>

      {!isLimitedView && showAppointments && (
        <>
          <h3>Existing Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table className={styles.appointmentsTable}>
              <thead>
                <tr>
                  <th>AppointmentID</th>
                  <th>ClientID</th>
                  <th>ServiceID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
             <tbody>
  {appointments.map((a) => (
    <tr key={a.AppointmentID}>
      <td data-label="AppointmentID">{a.AppointmentID}</td>
      <td data-label="ClientID">{a.ClientID}</td>
      <td data-label="ServiceID">{a.ServiceID}</td>
      <td data-label="Date">{a.AppointmentDate.slice(0, 10)}</td>
      <td data-label="Status">{a.Status}</td>
      <td data-label="Actions" className={styles.actionButtons}>
        {!isLimitedView && (
          <div className={styles.actionButtonWrapper}>
            <button
              className={styles.editButton}
              onClick={() => handleEdit(a)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(a.AppointmentID)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AddAppointmentsForm;