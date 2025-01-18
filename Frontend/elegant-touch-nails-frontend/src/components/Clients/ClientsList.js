import React, { useState, useEffect } from "react";
import { fetchClients } from "servicesdirectory/api"; // Ensure correct path to API service

const ClientsList = () => {
  const [clients, setClients] = useState([]); // Initialize state for clients
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    // Fetch clients data when the component mounts
    fetchClients()
      .then((response) => {
        if (Array.isArray(response)) {
          setClients(response); // If the API directly returns an array
        } else if (response.clients && Array.isArray(response.clients)) {
          setClients(response.clients); // If the API has a 'clients' key
        } else {
          setError("Clients data is not in the expected format.");
        }
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
        setError("Failed to load clients. Please try again later.");
        setLoading(false); // Stop loading if there's an error
      });
  }, []); // Empty dependency array ensures it runs once after component mounts

  // Loading state handling
  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h2>Clients List</h2>create a architecture diagram
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if any */}
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
          {/* Display message if no clients are found */}
          {clients.length === 0 ? (
            <tr>
              <td colSpan="5">No clients available.</td>
            </tr>
          ) : (
            // Render the clients if found
            clients.map((client) => (
              <tr key={client.clientID}>
                <td>{client.fullName}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.passwordHash}</td>
                <td>{client.createdAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
