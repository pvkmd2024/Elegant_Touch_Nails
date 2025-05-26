import React, { useEffect, useState } from "react";
import ServicesList from "./ServicesList";
import AddServiceForm from "./AddServiceForm";
import { fetchServices } from "servicesdirectory/api";

const ServiceDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Unable to fetch services");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div>
      <AddServiceForm onServiceAdded={loadServices} />
      <ServicesList services={services} loading={loading} error={error} />
    </div>
  );
};

export default ServiceDashboard;
