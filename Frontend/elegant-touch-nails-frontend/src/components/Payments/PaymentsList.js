import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "servicesdirectory/api";

const StaffScheduleList = () => {
  const [staffSchedules, setStaffSchedules] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getStaffSchedules = async () => {
      try {
        const data = await fetchStaffSchedules();
        console.log("Fetched staff schedules:", data); // Log the response to verify the data format
        if (Array.isArray(data)) {
          setStaffSchedules(data); // Update state if data is an array
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Failed to fetch staff schedules. Please try again later.");
        setLoading(false); // Stop loading in case of error
      }
    };
    getStaffSchedules();
  }, []); // Empty dependency array ensures it runs once after mount

  // Check if data is still loading or an error occurred
  if (loading) {
    return <div>Loading staff schedules...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Ensure that staffSchedules is an array and not undefined
  if (!Array.isArray(staffSchedules)) {
    return <div>Error: Staff schedules data is not in expected format.</div>;
  }

  // Render staff schedules data
  return (
    <div>
      <h2>Staff Schedules</h2>
      {staffSchedules.length === 0 ? (
        <p>No staff schedules available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Day of Week</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {staffSchedules.map((schedule) => (
              <tr key={schedule.staffScheduleID}>
                <td>{schedule.staffID}</td>
                <td>{schedule.DayOfWeek}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffScheduleList;
