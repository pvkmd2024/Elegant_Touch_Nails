import React, { useState, useRef } from "react";
import {
  fetchStaffSchedules,
  createStaffSchedule,
  updateStaffSchedule,
  deleteStaffSchedule,
} from "servicesdirectory/api";

import "./StaffScheduleForm.css";

const StaffScheduleForm = () => {
  const formRef = useRef(null);

  const [schedules, setSchedules] = useState([]);
  const [showSchedules, setShowSchedules] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [StaffID, setStaffID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");

  // Load schedules initially
  const fetchData = async () => {
    try {
      const data = await fetchStaffSchedules();
      setSchedules(data);
      setShowSchedules(true);
      console.log("Updated schedules state:", data); // Debugging log
    } catch (error) {
      console.error("Failed to fetch schedules:", error.message);
    }
  };

const unloadData = () => {
  setSchedules([]);
  setShowSchedules(false);
};

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const resetForm = () => {
    setEditingId(null);
    setStaffID("");
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const schedule = { StaffID, DayOfWeek, StartTime, EndTime };

  try {
    if (editingId) {
      await updateStaffSchedule(editingId, schedule);
      alert("Schedule updated successfully.");
    } else {
      const result = await createStaffSchedule(schedule);
      console.log("Created schedule response:", result); 
      alert("Schedule added successfully.");
    }

    await fetchData();      
    setShowSchedules(true); 
    resetForm();

  } catch (err) {
    console.error("Operation failed:", err.message);
    alert("Failed to submit schedule.");
  }
};

const handleEdit = (schedule) => {
  setEditingId(schedule.ScheduleID);
  setStaffID(schedule.StaffID);
  setDayOfWeek(schedule.DayOfWeek);
  setStartTime(schedule.StartTime);
  setEndTime(schedule.EndTime);

  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await deleteStaffSchedule(id);
      alert("Schedule deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete schedule.");
    }
  };

  return (
    <div className="staff-schedule-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
  <h2>{editingId ? "Edit" : "Add"} Staff Schedule </h2>

  {editingId && (
    <div>
      <label>Schedule ID</label>
      <input type="text" value={editingId} readOnly />
    </div>
  )}

  <input
    type="text"
    placeholder="Staff ID"
    value={StaffID}
    onChange={(e) => setStaffID(e.target.value)}
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
        <option key={day} value={day}>
          {day}
        </option>
      )
    )}
  </select>

  <input
    type="time"
    value={StartTime}
    onChange={(e) => setStartTime(e.target.value)}
    required
  />
  <input
    type="time"
    value={EndTime}
    onChange={(e) => setEndTime(e.target.value)}
    required
  />

 <div className="action-buttons">
  <button id="add-schedule-btn" type="submit">
    {editingId ? "Update" : "Add"}
  </button>
  <button id="load-schedules-btn" type="button" onClick={fetchData}>
    Load
  </button>
  <button id="unload-schedules-btn" type="button" onClick={unloadData}>
    Unload
  </button>
  <button id="clear-btn" type="button" onClick={resetForm}>
    Clear
  </button>
  {/* <button
    className="delete-button"
    type="button"
    onClick={() => handleDelete(editingId)}
    disabled={!editingId}
  >
    Delete
  </button> */}
</div>


</form>

{showSchedules && (
  <>
    <h3 ref={formRef}>Existing Schedules</h3>
      {schedules.length === 0 ? (
        <p>No schedules found.</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>ScheduleID</th>
              <th>StaffID</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.ScheduleID}>
                <td>{s.ScheduleID}</td>
                <td>{s.StaffID}</td>
                <td>{s.DayOfWeek}</td>
                <td>{s.StartTime}</td>
                <td>{s.EndTime}</td>
                <td className="action-buttons">
  <button className="edit-button" onClick={() => handleEdit(s)}>Edit</button>
  <button
    className="delete-button"
    onClick={() => handleDelete(s.ScheduleID)}
  >
    Delete
  </button>
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
export default StaffScheduleForm;
