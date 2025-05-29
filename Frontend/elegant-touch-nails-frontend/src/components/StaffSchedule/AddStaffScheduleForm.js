import React, { useState } from "react";
import { createStaffSchedule } from "servicesdirectory/api";
import "./StaffScheduleForm.css";

const AddStaffScheduleForm = () => {
  const [StaffID, setStaffID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!StaffID || !DayOfWeek || !StartTime || !EndTime) {
      alert("Please fill in all fields.");
      return;
    }

    const scheduleData = { StaffID, DayOfWeek, StartTime, EndTime };

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
        console.error("Failed to add Staff schedule:", error);
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
        name="StaffID"
        placeholder="Staff ID"
        value={StaffID}
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
        name="StartTime"
        placeholder="Start Time"
        value={StartTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        name="EndTime"
        placeholder="End Time"
        value={EndTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Schedule"}
      </button>
    </form>
  );
};

export default AddStaffScheduleForm;
