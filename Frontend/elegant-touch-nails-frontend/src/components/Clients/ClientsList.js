import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api";
import styles from "./ClientsList.module.css";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({}); // key: ClientID, value: true/false

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

  const togglePasswordVisibility = (clientId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  if (loading) return <div>Loading Clients...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(clients)) return <div>Invalid data format.</div>;

  return (
    <div className={styles.clientsContainer}>
      <h2 className={styles.pageHeading}>Clients</h2>

      {clients.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={styles.clientsTableWrapper}>
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
                    <td data-label="Password">
                      {visiblePasswords[client.ClientID]
                        ? client.Password
                        : "••••••••"}
                      <button
                        className={styles.togglePasswordButton}
                        onClick={() => togglePasswordVisibility(client.ClientID)}
                      >
                        {visiblePasswords[client.ClientID] ? "Hide" : "Show"}
                      </button>
                    </td>
                    <td data-label="Created At">
                      {client.CreatedAt ? client.CreatedAt.slice(0, 10) : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className={styles.clientsCardsContainer}>
            {clients.map((client) => (
              <div className={styles.clientCard} key={client.ClientID}>
                <h4>{client.FullName}</h4>
                <p><strong>Email:</strong> {client.Email}</p>
                <p><strong>Phone:</strong> {client.PhoneNumber}</p>
                <p>
                  <strong>Password:</strong>{" "}
                  {visiblePasswords[client.ClientID]
                    ? client.Password
                    : "••••••••"}
                  <button
                    className={styles.togglePasswordButton}
                    onClick={() => togglePasswordVisibility(client.ClientID)}
                  >
                    {visiblePasswords[client.ClientID] ? "Hide" : "Show"}
                  </button>
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {client.CreatedAt ? client.CreatedAt.slice(0, 10) : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsList;
