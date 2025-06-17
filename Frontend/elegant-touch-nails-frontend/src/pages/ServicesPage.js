import React, { useEffect, useState } from "react";
import { fetchServices } from "../servicesdirectory/api";
import ServicesList from "../components/Services/ServicesList";
import AddServicesForm from "../components/Services/AddServicesForm";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then((data) => setServices(data));
  }, []);

  return (
    <div>
      <AddServicesForm />
      <ServicesList services={services} />
    </div>
  );
};

export default ServicesPage;
