import React, { useState } from "react";
import { createStaff } from "../services/api";

const AddStaffForm = () => {
  const [FullName, setFullName] = useState("");
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!FullName || !Role || !Email || !PasswordHash) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    const staffData = { FullName, Role, Email, PasswordHash };

    createStaff(staffData)
      .then(() => {
        alert("Staff member added successfully!");
        setFullName("");
        setRole("");
        setEmail("");
        setPasswordHash("");
        setError(""); // Clear error on success
      })
      .catch((error) => {
        console.error("Failed to add staff member:", error);
        setError("Failed to add staff member. Please try again.");
      })
      .finally(() => setLoading(false)); // Stop loading once the request is complete
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Staff Member</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error messages */}
      <input
        type="text"
        placeholder="Full Name"
        value={FullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={Role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={PasswordHash}
        onChange={(e) => setPasswordHash(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Staff"}
      </button>
    </form>
  );
};

export default AddStaffForm;
