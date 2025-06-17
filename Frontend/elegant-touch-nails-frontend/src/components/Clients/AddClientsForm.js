import React, { useState, useRef } from "react";
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from "servicesdirectory/api";

import "./ClientsForm.css"; 

const AddClientsForm = () => {
  const formRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");

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
    setPasswordHash("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = { FullName, Email, PhoneNumber, PasswordHash };

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
    setPasswordHash(client.PasswordHash);

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

  return (
    <div className="clients-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Add"} Client</h2>

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
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password Hash"
          value={PasswordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          required
        />

        <div className="action-buttons">
          <button type="submit">{editingId ? "Update" : "Add"}</button>
     <button type="button" onClick={fetchData} disabled={loading}>
  {loading ? "Loading..." : "Load"}
</button>
          <button type="button" onClick={unloadData}>
            Unload
          </button>
          <button type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {showClients && (
        <>
          <h3>Existing Clients</h3>
          {Array.isArray(clients) && clients.length === 0 ? (
            <p>No clients found.</p>
          ) : (
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password Hash</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.ClientID}>
                    <td>{c.ClientID}</td>
                    <td>{c.FullName}</td>
                    <td>{c.Email}</td>
                    <td>{c.PhoneNumber}</td>
                    <td>{c.PasswordHash}</td>
                    <td>{c.CreatedAt? new Date(c.CreatedAt).toLocaleString() : "N/A"}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(c)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(c.ClientID)}>Delete</button>
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

export default AddClientsForm;
