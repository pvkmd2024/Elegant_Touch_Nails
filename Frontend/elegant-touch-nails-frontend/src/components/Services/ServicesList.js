import React, { useEffect, useState } from "react";
import { fetchServices } from "servicesdirectory/api"; 
import styles from "./ServicesList.module.css";

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

  const alertDescription = (description) => {
    alert(description);
  };

  if (loading) return <div>Loading services...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className={styles.servicesContainer}>
      <h2 className={styles.pageHeading}>Services</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table className={styles.servicesTable}>
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
                <td data-label="ServiceName">{service.ServiceName}</td>
                <td data-label="Description">
                  <button className={styles.viewButton} onClick={() => alertDescription(service.Description)}>
                    View Description
                  </button>
                </td>
                <td data-label="MinDuration">{service.MinDuration}</td>
                <td data-label="MaxDuration">{service.MaxDuration}</td>
                <td data-label="MinPrice">${service.MinPrice}</td>
                <td data-label="MaxPrice">${service.MaxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesList;

