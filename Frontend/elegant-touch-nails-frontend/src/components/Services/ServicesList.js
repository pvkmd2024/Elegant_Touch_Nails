// // import React, { useEffect, useState } from "react";
// // import { fetchServices } from "servicesdirectory/api"; // Ensure correct path to API service

// // const ServicesList = () => {
// //   const [services, setServices] = useState([]);
// //   const [loading, setLoading] = useState(false); // Track loading state
// //   const [error, setError] = useState(""); // Track error state

// //   useEffect(() => {
// //     const getServices = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await fetchServices();
// //         console.log("Fetched services data:", response); // Debugging log
// //         if (Array.isArray(response.services)) {
// //           setServices(response.services); // Set services if data is valid
// //         } else {
// //           setError("Services data is not in the expected format.");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching services:", error);
// //         setError("Failed to fetch services.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     getServices();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Services List</h2>
// //       {loading && <p>Loading services...</p>} {/* Show loading message */}
// //       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
// //       {/* Show error message */}
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Service Name</th>
// //             <th>Description</th>
// //             <th>Min Duration</th>
// //             <th>Max Duration</th>
// //             <th>Min Price</th>
// //             <th>Max Price</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {services.length > 0 ? (
// //             services.map((service) => (
// //               <tr key={service.id}>
// //                 <td>{service.ServiceName}</td>
// //                 <td>{service.Description}</td>
// //                 <td>{service.MinDuration} mins</td>
// //                 <td>{service.MaxDuration} mins</td>
// //                 <td>${service.MinPrice}</td>
// //                 <td>${service.MaxPrice}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="6">No services available</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ServicesList;

// import React, { useState, useEffect } from "react";
// import { fetchServices } from "servicesdirectory/api"; // Ensure correct path to API service

// const ServicesList = () => {
//   const [services, setServices] = useState([]); // Initialize state for services
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(""); // Track error state

//   useEffect(() => {
//     // Fetch services data when the component mounts
//     fetchServices()
//       .then((response) => {
//         if (Array.isArray(response.services)) {
//           setServices(response.services); // Set services if data is valid
//         } else {
//           setError("Services data is not in the expected format.");
//         }
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error("Failed to fetch services:", error);
//         setError("Failed to load services. Please try again later.");
//         setLoading(false); // Set loading to false if there's an error
//       });
//   }, []); // Empty dependency array ensures it runs once after component mounts

//   // Loading state handling
//   if (loading) {
//     return <div>Loading services...</div>;
//   }

//   return (
//     <div>
//       <h2>Services List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//       {/* Display error message if any */}
//       <table>
//         <thead>
//           <tr>
//             <th>Service Name</th>
//             <th>Description</th>
//             <th>Min Duration</th>
//             <th>Max Duration</th>
//             <th>Min Price</th>
//             <th>Max Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Display message if no services are found */}
//           {services.length === 0 ? (
//             <tr>
//               <td colSpan="6">No services available.</td>
//             </tr>
//           ) : (
//             // Render the services if found
//             services.map((service) => (
//               <tr key={service.id}>
//                 <td>{service.ServiceName}</td>
//                 <td>{service.Description}</td>
//                 <td>{service.MinDuration} mins</td>
//                 <td>{service.MaxDuration} mins</td>
//                 <td>${service.MinPrice}</td>
//                 <td>${service.MaxPrice}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ServicesList;

import React, { useState, useEffect } from "react";
import { fetchServices } from "servicesdirectory/api"; // Adjust path if needed

const ServicesList = () => {
  const [services, setServices] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        console.log("Fetched services:", data); // Log the response to verify the data format
        if (Array.isArray(data)) {
          setServices(data); // Update state if data is an array
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Failed to fetch services. Please try again later.");
        setLoading(false); // Stop loading in case of error
      }
    };
    getServices();
  }, []); // Empty dependency array ensures it runs once after mount

  // Check if data is still loading or an error occurred
  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Ensure that services is an array and not undefined
  if (!Array.isArray(services)) {
    return <div>Error: Services data is not in expected format.</div>;
  }

  // Render services data
  return (
    <div>
      <h2>Services List</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Min Duration</th>
              <th>Max Duration</th>
              <th>Min Price</th>
              <th>Max Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              console.log(service.ID); // Log to check the id values
              return (
                <tr key={service.ID}>
                  <td>{service.ServiceName}</td>
                  <td>{service.Description}</td>
                  <td>{service.MinDuration} mins</td>
                  <td>{service.MaxDuration} mins</td>
                  <td>${service.MinPrice}</td>
                  <td>${service.MaxPrice}</td>
                </tr>
              );
            })}
            ;
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesList;
