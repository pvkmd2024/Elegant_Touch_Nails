import React, { useState, useRef } from "react";
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from "servicesdirectory/api";
import styles from "./ClientsForm.module.css";
import { useLocation } from "react-router-dom";
const AddClientsForm = () => {
  const location = useLocation();
  const isLimitedView = location.state?.isLimitedView ?? false;
  const formRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
const [visiblePasswords, setVisiblePasswords] = useState({});

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
      setShowClients(true);
    } catch (error) {
      console.error("Failed to fetch clients:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const unloadData = () => {
    setClients([]);
    setShowClients(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = { FullName, Email, PhoneNumber, Password };

    try {
      if (editingId) {
        await updateClient(editingId, client);
        alert("Client updated successfully.");
      } else {
        await createClient(client);
        alert("Client added successfully.");
      }

      await fetchData();
      resetForm();
    } catch (err) {
      console.error("Operation failed:", err.message);
      alert("Failed to submit client.");
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.ClientID);
    setFullName(client.FullName);
    setEmail(client.Email);
    setPhoneNumber(client.PhoneNumber);
    setPassword(client.Password);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    setEditingId(null);

    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await deleteClient(id);
      alert("Client deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete client.");
    }
  };
const togglePasswordVisibility = (clientId) => {
  setVisiblePasswords((prev) => ({
    ...prev,
    [clientId]: !prev[clientId],
  }));
};

  return (
    <div className={styles.clientsPageWrapper}>
      <div className={styles.clientsFormContainer} >
        <div className={styles.clientsContainer} ref={formRef}>
          <form onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit" : "Sign Up"}


            </h2>

            {editingId && (
              <div>
                <label>Client ID</label>
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
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              pattern="\d{10}"
              title="Enter a 10-digit phone number"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

        <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className={styles.actionButtons}>
              <button
                type="submit"
                disabled={loading}
                className={styles.addClientBtn}
              >
                {editingId ? "Update" : "Add"}
              </button>
{!isLimitedView && (
  <>
    <button className={styles.loadClientsBtn} type="button" onClick={fetchData} disabled={loading}>
      {loading ? "Loading..." : "Load"}
    </button>
    <button className={styles.unloadClientsBtn} type="button" onClick={unloadData}>
      Unload
    </button>
    <button className={styles.clearBtn} type="button" onClick={resetForm}>
      Clear
    </button>
  </>
)}

            </div>
          </form>
        </div>
        { !isLimitedView && showClients && (
          <>
            <h3>Existing Clients</h3>
            {Array.isArray(clients) && clients.length === 0 ? (
              <p>No clients found.</p>
            ) : (
              <div className={styles.clientsTableWrapper}>
              <table className={styles.clientsTable}>
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Password</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.ClientID}>
                      <td data-label="Client ID">{c.ClientID}</td>
                      <td data-label="FullName">{c.FullName}</td>
                      <td data-label="Email">{c.Email}</td>
                      <td data-label="PhoneNumber">{c.PhoneNumber}</td>
                      <td data-label="Password">
  {visiblePasswords[c.ClientID] ? c.Password : "••••••••"}
  <button
    type="button"
    onClick={() => togglePasswordVisibility(c.ClientID)}
    className={styles.showPasswordBtn}
  >
    {visiblePasswords[c.ClientID] ? "Hide" : "Show"}
  </button>
</td>

                      <td data-label="CreatedAt">{c.CreatedAt ? new Date(c.CreatedAt).toLocaleString() : "N/A"}</td>
                      <td data-label="Actions" className={styles.actionButtons}>
                        <div className={styles.actionButtonWrapper}>
                          <button className={styles.editButton} onClick={() => handleEdit(c)}>Edit</button>
                          <button className={styles.deleteButton} onClick={() => handleDelete(c.ClientID)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default AddClientsForm;