import React, { useState, useRef } from "react";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "servicesdirectory/api";

import styles from "./ServicesForm.module.css";

const AddServicesForm = () => {
  const [services, setServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [ServiceName, setServiceName] = useState("");
  const [Description, setDescription] = useState("");
  const [MinDuration, setMinDuration] = useState("");
  const [MaxDuration, setMaxDuration] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");

  const formRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetchServices();

      if (Array.isArray(response)) {
        setServices(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        console.error("Unexpected response from fetchServices:", response);
        setServices([]);
      }

      setShowServices(true);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const unloadData = () => {
    setServices([]);
    setShowServices(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setServiceName("");
    setDescription("");
    setMinDuration("");
    setMaxDuration("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const service = {
      ServiceName,
      Description,
      MinDuration: Number(MinDuration),
      MaxDuration: Number(MaxDuration),
      MinPrice: Number(MinPrice),
      MaxPrice: Number(MaxPrice),
    };

    console.log("Submitting service:", service);

    try {
      if (editingId) {
        console.log("Updating service with ID:", editingId);
        await updateService(editingId, service);
        alert("Service updated successfully.");
      } else {
        console.log("Creating new service...");
        await createService([service]);
        alert("Service added successfully.");
      }

      await fetchData();
      resetForm();
    } catch (err) {
      console.error("Submit failed:", err);
      if (err.response) {
        const text = await err.response.text();
        console.error("Response data:", text);
      }
      alert("Failed to submit service.");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.ServiceID);
    setServiceName(service.ServiceName);
    setDescription(service.Description);
    setMinDuration(service.MinDuration);
    setMaxDuration(service.MaxDuration);
    setMinPrice(service.MinPrice);
    setMaxPrice(service.MaxPrice);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      alert("Service deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete service.");
    }
  };
  const alertDescription = async (description) => {
    alert(description)
  }

  return (
    <div className={styles.servicesFormContainer} ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Add"} A Service</h2>

        {editingId && (
          <div>
            <label>Service ID</label>
            <input type="text" value={editingId} readOnly disabled className="readonly-input" />
          </div>
        )}

        <input
          type="text"
          placeholder="Service Name"
          value={ServiceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Min Duration (mins)"
          value={MinDuration}
          onChange={(e) => setMinDuration(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Max Duration (mins)"
          value={MaxDuration}
          onChange={(e) => setMaxDuration(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Min Price ($)"
          value={MinPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Max Price ($)"
          value={MaxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          required
        />

        <div className={styles.actionButtons}>
          <button className={styles.addServiceBtn} type="submit">
            {editingId ? "Update" : "Add"}
          </button>
          <button className={styles.loadServicesBtn} type="button" onClick={fetchData}>
            Load
          </button>
          <button className={styles.unloadServicesBtn} type="button" onClick={unloadData}>
            Unload
          </button>
          <button className={styles.clearBtn} type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {showServices && (
        <>
          <h3>Existing Services</h3>
          {services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            <table className={styles.servicesTable}>
              <thead>
                <tr>
                  <th>ServiceID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>MinDur</th>
                  <th>MaxDur</th>
                  <th>MinPrice</th>
                  <th>MaxPrice</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.ServiceID}>
                    <td data-label="ServiceID">{s.ServiceID}</td>
                    <td data-label="ServiceName">{s.ServiceName}</td>
                    <td data-label="Description"> <button className={styles.viewButton} onClick={() => alertDescription(s.Description)}>View Description</button></td>
                    <td data-label="MinDuration">{s.MinDuration}</td>
                    <td data-label="MinDuration">{s.MaxDuration}</td>
                    <td data-label="MinPrice">${s.MinPrice}</td>
                    <td data-label="MaxPrice">${s.MaxPrice}</td>
                    <td className={styles.actionButtons}>
                      <div className={styles.actionButtonWrapper}>
                        <button className={styles.editButton} onClick={() => handleEdit(s)}>Edit</button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(s.ServiceID)}
                        >
                          Delete
                        </button>
                      </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AddServicesForm;
