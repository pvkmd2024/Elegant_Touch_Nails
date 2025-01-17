import React, { useEffect, useState } from "react";
import { fetchClients } from "../servicesdirectory/api";
import ClientsList from "../components/Clients/ClientsList";
import AddClientForm from "../components/Clients/AddClientForm";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients().then((data) => setClients(data));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <AddClientForm />
      <ClientsList clients={clients} />
    </div>
  );
};

export default ClientsPage;
