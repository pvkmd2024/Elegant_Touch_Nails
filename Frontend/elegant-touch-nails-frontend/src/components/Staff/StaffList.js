import React, { useEffect, useState } from "react";
import { fetchStaff } from "servicesdirectory/api";
import "./StaffList.css";

const StaffList = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaff()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStaffMembers(response.data); // Set staff members if valid
        } else {
          setError("Staff members data is not in the expected format.");
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch staff members:", error);
        setError("Failed to load staff members. Please try again later.");
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading staff members...</div>;
  }

  return (
    <div>
      <h2>Staff Members</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>PasswordHash</th>
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
                <td>{staff.PasswordHash}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
