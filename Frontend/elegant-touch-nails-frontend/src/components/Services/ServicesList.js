import React, { useEffect, useState } from "react";
import { fetchServices } from "servicesdirectory/api"; 
import "./ServicesForm.css";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const getServices = async () => {
      setLoading(true);
      try {
        const response = await fetchServices();
        console.log("Fetched services data:", response);

        // Defensive check: ensure the response is an array
        if (Array.isArray(response)) {
          setServices(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setError("Unexpected data format.");
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="services-container">
      <h2 className="page-heading">Services</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table className="services-table">
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
              <tr key={service.ServiceID}>
                <td>{service.ServiceName}</td>
                <td>{service.Description}</td>
                <td>{service.MinDuration}</td>
                <td>{service.MaxDuration}</td>
                <td>{service.MinPrice}</td>
                <td>{service.MaxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesList;
