import React, { useState } from "react";
import { createStaffSchedule } from "servicesdirectory/api";
import "./StaffScheduleForm.css";

const AddStaffScheduleForm = () => {
  const [staffID, setStaffID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!staffID || !DayOfWeek || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const scheduleData = { staffID, DayOfWeek, startTime, endTime };

    setLoading(true);
    setError(""); // Reset error message before starting the request

    createStaffSchedule(scheduleData)
      .then(() => {
        alert("Staff schedule added successfully!");
        setStaffID("");
        setDayOfWeek("");
        setStartTime("");
        setEndTime("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to add staff schedule:", error);
        setError("Failed to add schedule. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Staff Schedule</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <input
        type="text"
        name="staffID"
        placeholder="Staff ID"
        value={staffID}
        onChange={(e) => setStaffID(e.target.value)}
      />
      <select
        name="DayOfWeek"
        value={DayOfWeek}
        onChange={(e) => setDayOfWeek(e.target.value)}
      >
        <option value="">Select Day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <input
        type="time"
        name="startTime"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        name="endTime"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Schedule"}
      </button>
    </form>
  );
};

export default AddStaffScheduleForm;
