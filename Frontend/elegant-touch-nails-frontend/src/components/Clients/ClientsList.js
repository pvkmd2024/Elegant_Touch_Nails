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
        if (Array.isArray(response.clients)) {
          setClients(response.clients); // Set clients if data is valid
        } else {
          setError("Clients data is not in the expected format.");
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
        setError("Failed to load clients. Please try again later.");
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array ensures it runs once after component mounts

  // Loading state handling
  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h2>Clients List</h2>
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
              <td colSpan="2">No clients available.</td>
            </tr>
          ) : (
            // Render the clients if found
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.fullName}</td>
                <td>{client.email}</td>
                <td>{clients.phoneNumber}</td>
                <td>{clients.passwordHash}</td>
                <td>{clients.createdAt}</td>
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
// // import AddClientForm from "./AddClientForm";
// import { fetchClients } from "servicesdirectory/api";

// const ClientsList = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     fetchClients()
//       .then((response) => {
//         if (response?.clients?.length) {
//           setClients(response.clients);
//         } else {
//           setError("Failed to load clients.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch Clients Error:", err);
//         setError("Failed to fetch clients.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       {/* <h1>Clients</h1> */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <p>Loading...</p>}
//       {!loading && !error && (
//         <ul>
//           {clients.map((client) => (
//             <li key={client.id}>
//               {client.fullName} - {client.email}
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* <AddClientForm setClients={setClients} /> */}
//     </div>
//   );
// };

// export default ClientsList;
// import React, { useState, useEffect } from "react";
// import AddClientForm from "./AddClientForm";
// import { fetchClients } from "servicesdirectory/api";

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     fetchClients()
//       .then((response) => {
//         if (response && response.clients && Array.isArray(response.clients)) {
//           setClients(response.clients);
//         } else {
//           setError("Failed to load clients.");
//         }
//       })
//       .catch(() => setError("Failed to fetch clients."))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       <h1>Clients</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <p>Loading...</p>}
//       {!loading && !error && (
//         <ul>
//           {clients.map((client) => (
//             <li key={client.id}>
//               {client.fullName} - {client.email}
//             </li>
//           ))}
//         </ul>
//       )}
//       <AddClientForm setClients={setClients} />
//     </div>
//   );
// };

// export default ClientList;

// import React, { useEffect, useState } from "react";
// import { fetchClients } from "servicesdirectory/api"; // Ensure the correct path to the API service

// const ClientsList = () => {
//   const [clients, setClients] = useState([]); // Initialize state for clients
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(""); // Track error state

//   useEffect(() => {
//     // Fetch clients data when the component mounts
//     fetchClients()
//       .then((response) => {
//         console.log("Fetched Clients Data:", response); // Log the full response for debugging

//         // Access the clients array from the response
//         if (response && response.clients && Array.isArray(response.clients)) {
//           setClients(response.clients); // Set the clients state if data is in the expected format
//         } else {
//           setError("Clients data is not in the expected format.");
//         }
//         setLoading(false); // Stop loading once data is fetched
//       })
//       .catch((error) => {
//         console.error("Failed to fetch clients:", error);
//         setError("Failed to load clients. Please try again later.");
//         setLoading(false); // Stop loading if there was an error
//       });
//   }, []);

//   // Loading state handling
//   if (loading) {
//     return <div>Loading clients...</div>;
//   }

//   return (
//     <div>
//       <h2>Clients List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//       {/* Show error message if any */}
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
//           {/* Show a message if no clients are found */}
//           {clients.length === 0 ? (
//             <tr>
//               <td colSpan="5">No clients found.</td>
//             </tr>
//           ) : (
//             // Render clients if found
//             clients.map((client) => (
//               <tr key={client.ClientID}>
//                 <td>{client.FullName}</td>
//                 <td>{client.Email}</td>
//                 <td>{client.PhoneNumber}</td>
//                 <td>{client.PasswordHash}</td>
//                 <td>{client.CreatedAt}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientsList;

// import React, { useEffect, useState } from "react";
// import { fetchClients } from "servicesdirectory/api"; // Adjust path if needed

// const ClientsTable = ({ clients }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Full Name</th>
//           <th>Email</th>
//           <th>Phone Number</th>
//           <th>Password Hash</th>
//           <th>Created At</th>
//         </tr>
//       </thead>
//       <tbody>
//         {clients.map((client) => (
//           <tr key={client.ClientID}>
//             <td>{client.FullName}</td>
//             <td>{client.Email}</td>
//             <td>{client.PhoneNumber}</td>
//             <td>{client.PasswordHash}</td>
//             <td>{client.CreatedAt}</td> {/* Date displayed here */}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const ClientsList = () => {
//   const [clients, setClients] = useState([]); // Initialize with an empty array
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [error, setError] = useState(""); // Track error state

//   useEffect(() => {
//     const getClients = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchClients();
//         console.log("Fetched clients data:", response.data); // Debugging log
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//         setError("Failed to fetch clients.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getClients();
//   }, []);

//   // Render loading, error, or data
//   if (loading) {
//     return <p>Loading clients...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>; // Show error message
//   }

//   // Ensure that clients is an array before rendering
//   if (!Array.isArray(clients)) {
//     return <div>Error: Clients data is not in the expected format.</div>;
//   }

//   return (
//     <div>
//       <h2>Clients List</h2>
//       {/* Render ClientsTable and pass the clients data */}
//       <ClientsTable clients={clients} />
//     </div>
//   );
// };

// export default ClientsList;
