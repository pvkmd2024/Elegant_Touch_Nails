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
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.ServiceName}</td>
                <td>{service.Description}</td>
                <td>{service.MinDuration} mins</td>
                <td>{service.MaxDuration} mins</td>
                <td>${service.MinPrice}</td>
                <td>${service.MaxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesList;
