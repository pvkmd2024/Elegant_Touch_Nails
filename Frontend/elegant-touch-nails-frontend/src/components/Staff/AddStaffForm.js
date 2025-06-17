import React, { useState, useRef } from "react";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "servicesdirectory/api";

import "./StaffForm.css";

const StaffForm = () => {
  const formRef = useRef(null);

  const [staffList, setStaffList] = useState([]);
  const [showStaff, setShowStaff] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [FullName, setFullName] = useState("");
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchStaff();
      setStaffList(data);
      setShowStaff(true);
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
    }
  };

  const unloadData = () => {
    setStaffList([]);
    setShowStaff(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setFullName("");
    setRole("");
    setEmail("");
    setPasswordHash("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staff = { FullName, Role, Email, PasswordHash };

    try {
      if (editingId) {
        await updateStaff(editingId, staff);
        alert("Staff updated successfully.");
      } else {
        await createStaff(staff);
        alert("Staff added successfully.");
      }

      await fetchData();
      setShowStaff(true);
      resetForm();
    } catch (err) {
      console.error("Operation failed:", err.message);
      alert("Failed to submit staff.");
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.StaffID);
    setFullName(staff.FullName);
    setRole(staff.Role);
    setEmail(staff.Email);
    setPasswordHash(staff.PasswordHash);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await deleteStaff(id);
      alert("Staff deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete staff.");
    }
  };

  return (
    <div className="staff-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Add"} Staff Member</h2>

        {editingId && (
          <div>
            <label>Staff ID</label>
            <input type="text" value={editingId} readOnly />
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={Role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Password Hash"
          value={PasswordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          required
        />

        <div className="action-buttons">
          <button id="add-staff-btn" type="submit">
            {editingId ? "Update" : "Add"}
          </button>
          <button id="load-staff-btn" type="button" onClick={fetchData}>
            Load
          </button>
          <button id="unload-staff-btn" type="button" onClick={unloadData}>
            Unload
          </button>
          <button id="clear-btn" type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {showStaff && (
        <>
          <h3>Existing Staff</h3>
          {staffList.length === 0 ? (
            <p>No staff found.</p>
          ) : (
            <table className="staff-table">
              <thead>
                <tr>
                  <th>StaffID</th>
                  <th>FullName</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>PasswordHash</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((s) => (
                  <tr key={s.StaffID}>
                    <td>{s.StaffID}</td>
                    <td>{s.FullName}</td>
                    <td>{s.Role}</td>
                    <td>{s.Email}</td>
                    <td>{s.PasswordHash}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(s.StaffID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default StaffForm; 