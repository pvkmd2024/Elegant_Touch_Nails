import React, { useEffect, useState } from "react";
import { fetchStaff } from "../services/api";
import "./StaffList.css";

const StaffList = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    fetchStaff()
      .then((response) => {
        setStaffMembers(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch staff members:", error);
        setError("Failed to load staff members. Please try again later.");
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading staff members...</div>; // Display loading text
  }

  return (
    <div>
      <h2>Staff Members</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.length === 0 ? (
            <tr>
              <td colSpan="3">No staff members found.</td>
            </tr>
          ) : (
            staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.FullName}</td>
                <td>{staff.Role}</td>
                <td>{staff.Email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
