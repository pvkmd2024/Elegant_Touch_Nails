import React, { useEffect, useState } from "react";
import { fetchStaffSchedules } from "servicesdirectory/api";
import "./StaffScheduleForm.css";

const StaffScheduleList = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      try {
        const response = await fetchStaffSchedules();
        console.log("Fetched Staff Schedule data:", response);
        setScheduleList(response);
      } catch (error) {
        console.error("Error fetching Staff Schedules:", error);
        setError("Failed to fetch staff schedules.");
      } finally {
        setLoading(false);
      }
    };

    getSchedules();
  }, []);

  if (loading) return <div>Loading Staff Schedules...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(scheduleList)) return <div>Invalid data format.</div>;

  return (
    <div className="staff-table-container">
      <h2 className="page-heading">Staff Schedule List</h2>

      {scheduleList.length === 0 ? (
        <p>No staff schedules available.</p>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Day of Week</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {scheduleList.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.StaffID}</td>
                <td>{schedule.DayOfWeek}</td>
                <td>{schedule.StartTime}</td>
                <td>{schedule.EndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffScheduleList;
