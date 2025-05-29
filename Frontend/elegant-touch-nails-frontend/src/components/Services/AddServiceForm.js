import React, { useState } from "react";
import { createService } from "servicesdirectory/api";

const AddServiceForm = ({ onServiceAdded }) => {
  const [serviceData, setServiceData] = useState({
    ServiceName: "",
    Description: "",
    MinDuration: "",
    MaxDuration: "",
    MinPrice: "",
    MaxPrice: "",
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !serviceData.ServiceName ||
      !serviceData.Description ||
      !serviceData.MinDuration ||
      !serviceData.MaxDuration ||
      !serviceData.MinPrice ||
      !serviceData.MaxPrice
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError(null); // Reset previous error

    createService(serviceData)
      .then(() => {
        alert("Service added successfully!");
        setServiceData({
          ServiceName: "",
          Description: "",
          MinDuration: "",
          MaxDuration: "",
          MinPrice: "",
          MaxPrice: "",
        });
        setLoading(false); // Stop loading when done
        window.location.reload();
        // onServiceAdded();
      })
      .catch((error) => {
        console.error("Failed to add service:", error);
        setError("An error occurred while adding the service.");
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Service</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error message */}
      <input
        type="text"
        name="ServiceName"
        placeholder="ServiceName"
        value={serviceData.ServiceName}
        onChange={handleChange}
      />
      <textarea
        name="Description"
        placeholder="Description"
        value={serviceData.Description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="MinDuration"
        placeholder="Min Duration (mins)"
        value={serviceData.MinDuration}
        onChange={handleChange}
      />
      <input
        type="number"
        name="MaxDuration"
        placeholder="Max Duration (mins)"
        value={serviceData.MaxDuration}
        onChange={handleChange}
      />
      <input
        type="number"
        name="MinPrice"
        placeholder="Min Price"
        value={serviceData.MinPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="MaxPrice"
        placeholder="Max Price"
        value={serviceData.MaxPrice}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Service"}
      </button>
    </form>
  );
};

export default AddServiceForm;
