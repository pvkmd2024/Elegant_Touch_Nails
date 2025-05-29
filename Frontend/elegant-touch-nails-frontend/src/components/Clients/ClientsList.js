import React, { useEffect, useState } from "react";
import { fetchClients } from "servicesdirectory/api"; // Assuming this fetch function is available

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state
  
  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      try {
        const response = await fetchClients();
        console.log("Fetched clients data:", response); // Debugging log
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
  
  if (loading) return <div>Loading clients...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(clients)) return <div>Invalid data format.</div>;

  return (
    <div>
      <h2>Clients</h2>
      {clients.length === 0 ? (
        <p>No clients available.</p>
      ) : (
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
                <td>{new Date(client.CreatedAt).toLocaleString()}</td> {/* Format CreatedAt */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientsList;


// import React, { useState, useEffect } from "react";
// import { fetchClients } from "servicesdirectory/api"; // Ensure correct path to API service

// const ClientsList = () => {
//   const [clients, setClients] = useState([]); // Initialize state for clients
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(""); // Track error state

//   useEffect(() => {
//     // Fetch clients data when the component mounts
//     fetchClients()
//       .then((response) => {
//         if (Array.isArray(response)) {
//   setClients(response); // If the API directly returns an array
// } else if (response.clients && Array.isArray(response.clients)) {
//   setClients(response.clients); // If the API has a 'clients' key
// } else {
//   setError("Clients data is not in the expected format.");
// }
//       //   if (Array.isArray(response.clients)) {
//       //     setClients(response.clients); // Set clients if data is valid
//       //   } else {
//       //     setError("Clients data is not in the expected format.");
//       //   }
//       //   setLoading(false); // Set loading to false after data is fetched
//       // })
//       .catch((error) => {
//         console.error("Failed to fetch clients:", error);
//         setError("Failed to load clients. Please try again later.");
//         setLoading(false); // Set loading to false if there's an error
//       });
//   }, []); // Empty dependency array ensures it runs once after component mounts

//   // Loading state handling
//   if (loading) {
//     return <div>Loading clients...</div>;
//   }

//   return (
//     <div>
//       <h2>Clients List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//       {/* Display error message if any */}
//       <table>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Password Hash</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Display message if no clients are found */}
//           {clients.length === 0 ? (
//             <tr>
//               <td colSpan="2">No clients available.</td>
//             </tr>
//           ) : (
//             // Render the clients if found
//             clients.map((client) => (
//               <tr key={client.id}>
//                 <td>{client.fullName}</td>
//                 <td>{client.email}</td>
//                 <td>{clients.phoneNumber}</td>
//                 <td>{clients.passwordHash}</td>
//                 <td>{clients.createdAt}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientsList;
