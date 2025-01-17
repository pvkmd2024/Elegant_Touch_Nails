import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "servicesdirectory/api";

const StaffScheduleList = () => {
  const [staffSchedules, setStaffSchedules] = useState([]);

  useEffect(() => {
    fetchStaffSchedules()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStaffSchedules(response.data); // Set staff schedules if valid
        } else {
          console.error("Staff schedules data is not in the expected format.");
        }
      })
      .catch((error) =>
        console.error("Failed to fetch staff schedules:", error)
      );
  }, []);

  return (
    <div>
      <h2>Staff Schedules</h2>
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
          {Array.isArray(staffSchedules) && staffSchedules.length > 0 ? (
            staffSchedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.staffID}</td>
                <td>{schedule.DayOfWeek}</td>
                <td>{schedule.startTime}</td>
                <td>{schedule.endTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No staff schedules available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffScheduleList;
