import React, { useState } from "react";
import { createClient } from "servicesdirectory/api";
import { formatDateForInput } from "../../utils/dateUtils"; // Make sure to format the date properly

const AddClientForm = ({ onClientAdded }) => {
  const [clientData, setClientData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    PasswordHash: "",
    CreatedAt: formatDateForInput(new Date()), // Make sure to format the date correctly
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Simple validation
  if (
    !clientData.FullName ||
    !clientData.Email ||
    !clientData.PhoneNumber ||
    !clientData.PasswordHash ||
    !clientData.CreatedAt
  ) {
    setError("Please fill out all required fields.");
    return;
  }

  setLoading(true);
  setError(null); // Reset previous error

  try {
    // Log the client data for debugging purposes
    console.log("Client data being sent to API:", clientData);

    // Send request to create client
    await createClient(clientData);
    
    alert("Client added successfully!");
    setClientData({
      FullName: "",
      Email: "",
      PhoneNumber: "",
      PasswordHash: "",
      CreatedAt: formatDateForInput(new Date()), // Reset CreatedAt
    });
    setLoading(false); // Stop loading when done
    onClientAdded(); // Trigger callback if necessary

  } catch (error) {
    console.error("Failed to add client:", error);
    setError("An error occurred while adding the client.");
    setLoading(false); // Stop loading on error
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Client</h2>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message */}
      <input
        type="text"
        name="FullName"
        placeholder="Full Name"
        value={clientData.FullName}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="email"
        name="Email"
        placeholder="Email"
        value={clientData.Email}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="text"
        name="PhoneNumber"
        placeholder="Phone Number"
        value={clientData.PhoneNumber}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="password"
        name="PasswordHash"
        placeholder="Password Hash"
        value={clientData.PasswordHash}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="datetime-local"
        name="CreatedAt"
        value={clientData.CreatedAt}
        onChange={handleChange}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
};

export default AddClientForm;
