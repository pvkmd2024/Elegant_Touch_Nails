import React from "react";

const ServicesList = ({ services, loading, error }) => {
  if (loading) return <div>Loading services...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Array.isArray(services)) return <div>Invalid data format.</div>;

  return (
    <div>
      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ServiceID</th>
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
              <tr key={service.serviceID}>
                <td>{service.serviceID}</td>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.minDuration}</td>
                <td>{service.maxDuration}</td>
                <td>{service.minPrice}</td>
                <td>{service.maxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesList;



/*const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        console.log("Fetched services:", data);
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
        setLoading(false);
      }
    };

    getServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!Array.isArray(services)) {
    return <div>Error: Services data is not in expected format.</div>;
  }

  return (
    <div>
      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Service ID</th>
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
              <tr key={service.serviceID}>
                <td>{service.serviceID}</td>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.minDuration}</td>
                <td>{service.maxDuration}</td>
                <td>{service.minPrice}</td>
                <td>{service.maxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};*/
