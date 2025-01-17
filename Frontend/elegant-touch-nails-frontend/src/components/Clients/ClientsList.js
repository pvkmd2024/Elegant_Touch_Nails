import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api"; // Adjust path if needed

const ClientsList = () => {
  const [clients, setClients] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const getClients = async () => {
      setLoading(true); // Set loading to true when the fetch begins
      try {
        const response = await fetchClients(); // Assuming fetchClients returns a response
        const data = response.data; // Assuming response.data contains the client list

        // Ensure that data is an array before setting it
        if (Array.isArray(data)) {
          setClients(data); // Update state if data is an array
        } else {
          setError("Invalid data format received"); // Handle invalid data format
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Failed to fetch clients.");
        console.error("Error fetching clients:", error);
        setLoading(false); // Stop loading in case of an error
      }
    };

    getClients(); // Fetch clients when the component mounts
  }, []); // Empty dependency array ensures it runs only once after the component mounts

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
      <ul>
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.id}>
              {client.name} {/* Assuming client object has a name property */}
            </li>
          ))
        ) : (
          <li>No clients available</li> // Handle empty client list
        )}
      </ul>
    </div>
  );
};

export default ClientsList;
