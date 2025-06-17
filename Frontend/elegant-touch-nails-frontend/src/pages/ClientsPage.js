import React, { useEffect, useState } from "react";
import { fetchClients } from "../servicesdirectory/api";
import ClientsList from "../components/Clients/ClientsList";
import AddClientsForm from "../components/Clients/AddClientsForm";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients().then((data) => setClients(data));
  }, []);

  return (
    <div>
      <AddClientsForm />
      <ClientsList clients={clients} />
    </div>
  );
};

export default ClientsPage;
