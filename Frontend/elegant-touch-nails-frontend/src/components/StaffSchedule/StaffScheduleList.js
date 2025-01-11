import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "../services/api";

const StaffScheduleList = () => {
  const [staffSchedules, setStaffSchedules] = useState([]);

  useEffect(() => {
    fetchStaffSchedules()
      .then((response) => setStaffSchedules(response.data))
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
          {staffSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.staffID}</td>
              <td>{schedule.DayOfWeek}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffScheduleList;
