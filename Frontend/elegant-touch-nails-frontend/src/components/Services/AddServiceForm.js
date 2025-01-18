// import React, { useState } from "react";
// import { createService } from "servicesdirectory/api"; // Ensure correct path to API service

// const AddServiceForm = () => {
//   const [ServiceName, setServiceName] = useState("");
//   const [Description, setDescription] = useState("");
//   const [MinDuration, setMinDuration] = useState("");
//   const [MaxDuration, setMaxDuration] = useState("");
//   const [MinPrice, setMinPrice] = useState("");
//   const [MaxPrice, setMaxPrice] = useState("");
//   const [error, setError] = useState(""); // Track error messages
//   const [loading, setLoading] = useState(false); // Track loading state

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Input validation
//     if (
//       !ServiceName ||
//       !Description ||
//       !MinDuration ||
//       !MaxDuration ||
//       !MinPrice ||
//       !MaxPrice
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     const serviceData = {
//       ServiceName,
//       Description,
//       MinDuration,
//       MaxDuration,
//       MinPrice,
//       MaxPrice,
//     };

//     setLoading(true); // Set loading state to true when the request starts
//     setError(""); // Reset error message

//     createService(serviceData)
//       .then(() => {
//         alert("Service added successfully!");
//         setServiceName("");
//         setDescription("");
//         setMinDuration("");
//         setMaxDuration("");
//         setMinPrice("");
//         setMaxPrice("");
//       })
//       .catch((error) => {
//         setError("Failed to add service. Please try again.");
//         console.error("Error adding service:", error);
//       })
//       .finally(() => {
//         setLoading(false); // Reset loading state when the request finishes
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Service</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//       {/* Display error message */}
//       <input
//         type="text"
//         placeholder="Service Name"
//         value={ServiceName}
//         onChange={(e) => setServiceName(e.target.value)}
//       />
//       <textarea
//         placeholder="Description"
//         value={Description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Min Duration (mins)"
//         value={MinDuration}
//         onChange={(e) => setMinDuration(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Max Duration (mins)"
//         value={MaxDuration}
//         onChange={(e) => setMaxDuration(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Min Price"
//         value={MinPrice}
//         onChange={(e) => setMinPrice(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Max Price"
//         value={MaxPrice}
//         onChange={(e) => setMaxPrice(e.target.value)}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Adding..." : "Add Service"}
//       </button>
//     </form>
//   );
// };

// export default AddServiceForm;

import React, { useState } from "react";
import { createService } from "servicesdirectory/api";

const AddServiceForm = () => {
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
