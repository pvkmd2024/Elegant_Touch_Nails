import React, { useState, useRef } from "react";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "servicesdirectory/api";

import styles from "./StaffForm.module.css";

const AddStaffForm = () => {
  const formRef = useRef(null);

  const [staffList, setStaffList] = useState([]);
  const [showStaff, setShowStaff] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [FullName, setFullName] = useState("");
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchStaff();
      setStaffList(data);
      setShowStaff(true);
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
      alert("Failed to load staff.");
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
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const staff = {
      FullName,
      Role,
      Email,
      Password,
    };

    try {
      if (editingId) {
        await updateStaff(editingId, staff);
        alert("Staff updated successfully.");
      } else {
        await createStaff(staff);
        alert("Staff added successfully.");
      }

      await fetchData();
      resetForm();
    } catch (err) {
      console.error("Staff operation failed:", err.message);
      alert("Failed to submit staff data.");
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.StaffID);
    setFullName(staff.FullName);
    setRole(staff.Role);
    setEmail(staff.Email);
    setPassword(staff.Password);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
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
    <div className={styles.staffFormContainer} ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Staff" : "Add Staff"}</h2>

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
          className={styles.emailInput}
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.actionButtons}>
          <button className={styles.addStaffBtn} type="submit">
            {editingId ? "Update" : "Add"}
          </button>
          <button type="button" className={styles.loadStaffBtn} onClick={fetchData}>
            Load
          </button>
          <button type="button" className={styles.unloadStaffBtn} onClick={unloadData}>
            Unload
          </button>
          <button type="button" className={styles.clearBtn} onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {showStaff && (
        <>
          <h2>Existing Staff</h2>
          {staffList.length === 0 ? (
            <p>No staff found.</p>
          ) : (
            <table className={styles.staffTable}>
              <thead>
                <tr>
                  <th>StaffID</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((s) => (
                  <tr key={s.StaffID}>
                    <td data-label="Staff ID">{s.StaffID}</td>
                    <td data-label="Full Name">{s.FullName}</td>
                    <td data-label="Role">{s.Role}</td>
                    <td data-label="Email" className={styles.emailCell}>{s.Email}</td>
                    <td data-label="Password">{s.Password}</td>
                    <td data-label="Actions" className={styles.actionButtons}>
                      <div className={styles.actionButtonWrapper}>
                        <button className={styles.editButton} onClick={() => handleEdit(s)}>
                          Edit
                        </button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(s.StaffID)}>
                          Delete
                        </button>
                      </div>
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

export default AddStaffForm;
