import React, { useEffect, useState } from "react";
import { fetchStaff } from "servicesdirectory/api";
import styles from "./StaffList.module.css";

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data = await fetchStaff();
        setStaffList(data);
      } catch (err) {
        setError("Failed to fetch staff.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStaff();
  }, []);

  if (loading) return <div>Loading staff...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(staffList)) return <div>Invalid staff data format.</div>;

  return (
    <div className={styles.staffListContainer}>
      <h2 className={styles.pageheading}>Staff</h2>
      {staffList.length === 0 ? (
        <p>No staff members found.</p>
      ) : (
        <table className={styles.staffTable}>
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
                <td data-label="StaffID">{staff.StaffID}</td>
                <td data-label="FullName">{staff.FullName}</td>
                <td data-label="Role">{staff.Role}</td>
                <td data-label="Email">{staff.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;
