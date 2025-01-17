import React, { useState } from "react";
import { createPayment } from "servicesdirectory/api"; // Adjust the import path if necessary

const AddPaymentForm = () => {
  const [AppointmentID, setAppointmentID] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [PaymentStatus, setPaymentStatus] = useState("");
  const [Amount, setAmount] = useState("");
  const [PaidAt, setPaidAt] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !AppointmentID ||
      !PaymentMethod ||
      !PaymentStatus ||
      !Amount ||
      !PaidAt
    ) {
      setError("Please fill out all fields.");
      return; // Prevent submission if any field is missing
    }

    const paymentData = {
      AppointmentID,
      PaymentMethod,
      PaymentStatus,
      Amount,
      PaidAt,
    };

    setLoading(true); // Set loading state to true while waiting for the API response
    setError(""); // Clear any previous errors

    // Send data to the server using the createPayment function
    createPayment(paymentData)
      .then(() => {
        alert("Payment added successfully!");
        // Reset the form fields after successful submission
        setAppointmentID("");
        setPaymentMethod("");
        setPaymentStatus("");
        setAmount("");
        setPaidAt("");
        setLoading(false); // Reset loading state after success
      })
      .catch((error) => {
        console.error("Failed to add payment:", error);
        setError("Failed to add payment. Please try again.");
        setLoading(false); // Reset loading state after failure
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Payment</h2>

      {/* Display error message if present */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Appointment ID input */}
      <input
        type="text"
        placeholder="Appointment ID"
        value={AppointmentID}
        onChange={(e) => setAppointmentID(e.target.value)}
      />

      {/* Payment Method input */}
      <input
        type="text"
        placeholder="Payment Method"
        value={PaymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      {/* Payment Status select dropdown */}
      <select
        value={PaymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      >
        <option value="">Select Payment Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>

      {/* Amount input */}
      <input
        type="number"
        placeholder="Amount"
        value={Amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Paid At datetime input */}
      <input
        type="datetime-local"
        value={PaidAt}
        onChange={(e) => setPaidAt(e.target.value)}
      />

      {/* Submit button */}
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Add Payment"}
      </button>
    </form>
  );
};

export default AddPaymentForm;
