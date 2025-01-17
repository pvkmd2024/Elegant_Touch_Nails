import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api"; // Adjust path if needed

const ClientsTable = ({ clients }) => {
  return (
    <table>
      <thead>
        <tr>
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
            <td>{client.FullName}</td>
            <td>{client.Email}</td>
            <td>{client.PhoneNumber}</td>
            <td>{client.PasswordHash}</td>
            <td>{client.CreatedAt}</td> {/* Date displayed here */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ClientsList = () => {
  const [clients, setClients] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      try {
        const response = await fetchClients();
        console.log("Fetched clients data:", response.data); // Debugging log
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients.");
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  // Render loading, error, or data
  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Show error message
  }

  // Ensure that clients is an array before rendering
  if (!Array.isArray(clients)) {
    return <div>Error: Clients data is not in the expected format.</div>;
  }

  return (
    <div>
      <h2>Clients List</h2>
      {/* Render ClientsTable and pass the clients data */}
      <ClientsTable clients={clients} />
    </div>
  );
};

export default ClientsList;
