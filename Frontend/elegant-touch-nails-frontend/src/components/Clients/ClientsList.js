import React, { useEffect, useState } from "react";
import { fetchClients } from "../../services/api";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const getClients = async () => {
      setLoading(true); // Set loading to true when the fetch begins
      try {
        const response = await fetchClients();
        setClients(response.data); // Assuming response.data contains the client list
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Failed to fetch clients.");
        console.error("Error fetching clients:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    getClients();
  }, []); // This runs once after the component mounts

  return (
    <div>
      <h2>Clients List</h2>
      {loading && <p>Loading clients...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      <ul>
        {clients.length > 0 ? (
          clients.map((client) => <li key={client.id}>{client.name}</li>)
        ) : (
          <li>No clients available</li>
        )}
      </ul>
    </div>
  );
};

export default ClientsList;
