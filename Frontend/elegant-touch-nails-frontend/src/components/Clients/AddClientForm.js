import React, { useState } from "react";
import { createClient } from "servicesdirectory/api";
import { formatDateForInput } from "../../utils/dateUtils";

const AddClientForm = ({ setClients }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [createdAt, setCreatedAt] = useState(formatDateForInput(new Date()));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNumber || !passwordHash || !createdAt) {
      setError("All fields are required.");
      return;
    }

    const newClient = { fullName, email, phoneNumber, passwordHash, createdAt };

    setLoading(true);
    setError("");

    createClient(newClient)
      .then(() => {
        alert("Client added successfully!");
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setPasswordHash("");
        setCreatedAt(formatDateForInput(new Date()));

        setClients((prevClients) => [...prevClients, newClient]);
      })
      .catch((err) => {
        console.error("Create Client Error:", err);
        setError("Failed to add client. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Client</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password Hash"
        value={passwordHash}
        onChange={(e) => setPasswordHash(e.target.value)}
      />
      <input
        type="datetime-local"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
};

export default AddClientForm;
