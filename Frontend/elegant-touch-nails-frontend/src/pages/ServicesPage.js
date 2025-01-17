import React, { useEffect, useState } from "react";
import { fetchServices } from "../servicesdirectory/api";
import ServicesList from "../components/Services/ServicesList";
import AddServiceForm from "../components/Services/AddServiceForm";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then((data) => setServices(data));
  }, []);

  return (
    <div>
      <h2>Services</h2>
      <AddServiceForm />
      <ServicesList services={services} />
    </div>
  );
};

export default ServicesPage;
