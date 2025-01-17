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
// import React, { useState } from "react";
// import { createClient } from "servicesdirectory/api";
// import { formatDateForInput } from './utils/dateUtils';

// const AddClientForm = ({ setClients }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [passwordHash, setPasswordHash] = useState("");
//   const [createdAt, setCreatedAt] = useState(new Date().toISOString());
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Input validation
//     if (!fullName || !email || !phoneNumber || !passwordHash || !createdAt) {
//       setError("All fields are required.");
//       return;
//     }

//     const newClient = {
//       fullName,
//       email,
//       phoneNumber,
//       passwordHash,
//       createdAt: new Date().toISOString(),
//     };

//     setLoading(true);
//     setError("");

//     createClient(newClient)
//       .then(() => {
//         alert("Client added successfully!");
//         setFullName("");
//         setEmail("");
//         setPhoneNumber("");
//         setPasswordHash("");
//         setCreatedAt(new Date().toISOString());

//         // Update state with the new client
//         setClients((prevClients) => [...prevClients, newClient]);
//       })
//       .catch(() => {
//         setError("Failed to add client. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   };

//   const DateTimeInput = () => {
//   const [dateValue, setDateValue] = useState('2025-01-17T12:58:01.385Z'); // Example initial value

//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 16); // Returns 'YYYY-MM-DDTHH:mm'
//   };

//   const handleDateChange = (event) => {
//     setDateValue(event.target.value); // Update state on change
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Client</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password Hash"
//         value={passwordHash}
//         onChange={(e) => setPasswordHash(e.target.value)}
//       />
//       <input
//         type="datetime-local"
//         placeholder="Created At"
//         value={formatDateForInput(yourDateValue)/}
//         onChange={(e) => setCreatedAt(e.target.value)}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Adding..." : "Add Client"}
//       </button>
//     </form>
//   );
// };

// export default AddClientForm;

// import React, { useState } from "react";
// import { createClient } from "servicesdirectory/api";

// const AddClientForm = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [passwordHash, setPasswordHash] = useState("");
//   const [createdAt, setCreatedAt] = useState(new Date().toISOString());
//   const [error, setError] = useState(""); // Track error messages
//   const [loading, setLoading] = useState(false); // Track loading state

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Input validation
//     if (!fullName || !email || !phoneNumber || !passwordHash || !createdAt) {
//       setError("All fields are required.");
//       return;
//     }

//     const newClient = {
//       fullName,
//       email,
//       phoneNumber,
//       passwordHash,
//       createdAt: new Date().toISOString(),
//     };

//     setLoading(true); // Set loading state to true when the request starts
//     setError(""); // Reset error message

//     createClient(newClient)
//       .then(() => {
//         alert("Client added successfully!");
//         setFullName("");
//         setEmail("");
//         setPhoneNumber("");
//         setPasswordHash("");
//         setCreatedAt(new Date().toISOString()); // Reset to current date/time after submission
//       })
//       .catch((error) => {
//         setError("Failed to add client. Please try again.");
//         console.error("Error adding client:", error);
//       })
//       .finally(() => {
//         setLoading(false); // Reset loading state when the request finishes
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Client</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//       {/* Display error message */}
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password Hash"
//         value={passwordHash}
//         onChange={(e) => setPasswordHash(e.target.value)}
//       />
//       <input
//         type="datetime-local"
//         placeholder="Created At"
//         value={createdAt}
//         onChange={(e) => setCreatedAt(e.target.value)}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Adding..." : "Add Client"}
//       </button>
//     </form>
//   );
// };

// export default AddClientForm;
