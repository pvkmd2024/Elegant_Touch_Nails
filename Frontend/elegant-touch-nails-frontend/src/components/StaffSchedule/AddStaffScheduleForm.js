import React, { useState, useRef } from "react";
import {
  fetchStaffSchedules,
  createStaffSchedule,
  updateStaffSchedule,
  deleteStaffSchedule,
} from "servicesdirectory/api";

import styles from "./StaffScheduleForm.module.css";

const StaffScheduleForm = () => {
  const formRef = useRef(null);
  const tableRef = useRef(null);

  const [schedules, setSchedules] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [StaffID, setStaffID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");

  /* ---------- CRUD helpers ---------- */
  const loadData = async () => {
    try {
      const data = await fetchStaffSchedules();
      setSchedules(data);
      setShowTable(true);
    } catch (err) {
      alert("Failed to load schedules");
      console.error(err);
    }
  };

  const unloadData = () => {
    setSchedules([]);
    setShowTable(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setStaffID("");
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { StaffID, DayOfWeek, StartTime, EndTime };

    try {
      if (editingId) {
        await updateStaffSchedule(editingId, payload);
        alert("Schedule updated");
      } else {
        await createStaffSchedule(payload);
        alert("Schedule added");
      }
      await loadData();
      resetForm();
      setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  const handleEdit = (sched) => {
    setEditingId(sched.ScheduleID);
    setStaffID(sched.StaffID);
    setDayOfWeek(sched.DayOfWeek);
    setStartTime(sched.StartTime);
    setEndTime(sched.EndTime);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await deleteStaffSchedule(id);
      alert("Schedule deleted");
      loadData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className={styles.scheduleFormContainer} ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Add"} A Staff Schedule</h2>

        {editingId && (
          <input type="text" value={editingId} readOnly placeholder="Schedule ID" />
        )}

        <input
          type="text"
          value={StaffID}
          onChange={(e) => setStaffID(e.target.value)}
          placeholder="Staff ID"
          required
        />

        <select
          value={DayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          required
        >
          <option value="">Select Day</option>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
            (day) => (
              <option key={day} value={day}>{day}</option>
            )
          )}
        </select>

        <input type="time" value={StartTime} onChange={(e) => setStartTime(e.target.value)} required />
        <input type="time" value={EndTime} onChange={(e) => setEndTime(e.target.value)} required />

        <div className={styles.actionButtons}>
          <button type="submit" className={styles.addStaffScheduleBtn}>
            {editingId ? "Update" : "Add"}
          </button>
          <button type="button" onClick={loadData} className={styles.loadStaffScheduleBtn}>
            Load
          </button>
          <button type="button" onClick={unloadData} className={styles.unloadStaffScheduleBtn}>
            Unload
          </button>
          <button type="button" onClick={resetForm} className={styles.clearBtn}>
            Clear
          </button>
        </div>
      </form>

      {/* ---------- LIST ---------- */}
      {showTable && (
        <div ref={tableRef}>
          <h2>Existing Schedules</h2>
          {schedules.length === 0 ? (
            <p>No schedules found.</p>
          ) : (
            <table className={styles.staffScheduleTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Day</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.ScheduleID}>
                    <td data-label="ScheduleID">{s.ScheduleID}</td>
                    <td data-label="StaffID">{s.StaffID}</td>
                    <td data-label="DayOfWeek">{s.DayOfWeek}</td>
                    <td data-label="StartTime">{s.StartTime}</td>
                    <td data-label="EndTime">{s.EndTime}</td>
                    <td className={styles.actionButtons}>
                      <div className={styles.actionButtonWrapper}>
                        <button className={styles.editButton} onClick={() => handleEdit(s)}>
                          Edit
                        </button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(s.ScheduleID)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffScheduleForm;
