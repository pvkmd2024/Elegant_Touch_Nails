import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api";
import "./ClientsForm.css"; 

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      try {
        const response = await fetchClients();
        console.log("Fetched clients data:", response);
        setClients(response);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients.");
      } finally {
        setLoading(false);
      }
    };
    getClients();
  }, []);

  if (loading) return <div>Loading Clients...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(clients)) return <div>Invalid data format.</div>;

  return (
    <div className="clients-container">
      <h2 className="page-heading">Clients Management</h2>

      {clients.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password Hash</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.ClientID}>
                <td>{client.ClientID}</td>
                <td>{client.FullName}</td>
                <td>{client.Email}</td>
                <td>{client.PhoneNumber}</td>
                <td>{client.PasswordHash}</td>
                <td>{client.CreatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientsList;
