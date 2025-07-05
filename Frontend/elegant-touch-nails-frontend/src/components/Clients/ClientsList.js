import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api";
import styles from "./ClientsList.module.css";

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
    <div className={styles.clientsContainer}>
      <h2 className={styles.pageHeading}>Clients Management</h2>

      {clients.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.clientsTable}>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.ClientID}>
                  <td data-label="Client ID">{client.ClientID}</td>
                  <td data-label="Full Name">{client.FullName}</td>
                  <td data-label="Email">{client.Email}</td>
                  <td data-label="Phone Number">{client.PhoneNumber}</td>
                  <td data-label="Password">{client.Password}</td>
                  <td data-label="Created At">
                    {client.CreatedAt ? client.CreatedAt.slice(0, 10) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
