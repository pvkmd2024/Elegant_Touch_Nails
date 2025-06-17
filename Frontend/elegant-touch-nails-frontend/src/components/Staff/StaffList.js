import React, { useEffect, useState } from "react";
import { fetchStaff } from "servicesdirectory/api";
import "./StaffForm.css";

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStaff = async () => {
      setLoading(true);
      try {
        const response = await fetchStaff();
        console.log("Fetched Staff data:", response);
        setStaffList(response);
      } catch (error) {
        console.error("Error fetching Staff:", error);
        setError("Failed to fetch Staff.");
      } finally {
        setLoading(false);
      }
    };
    getStaff();
  }, []);

  if (loading) return <div>Loading Staff...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(staffList)) return <div>Invalid data format.</div>;

  return (
    <div className="staff-table-container">
      <h2 className="page-heading">Staff List</h2>

      {staffList.length === 0 ? (
        <p>No staff members available.</p>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.StaffID}>
                <td>{staff.StaffID}</td>
                <td>{staff.FullName}</td>
                <td>{staff.Role}</td>
                <td>{staff.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;