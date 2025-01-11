import React, { useEffect, useState } from "react";
import { fetchServices } from "../services/api";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To track error state

  useEffect(() => {
    fetchServices()
      .then((response) => {
        setServices(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setError("Failed to fetch services. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>Services List</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ServiceName</th>
              <th>Description</th>
              <th>MinDuration</th>
              <th>MaxDuration</th>
              <th>MinPrice</th>
              <th>MaxPrice</th>
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
