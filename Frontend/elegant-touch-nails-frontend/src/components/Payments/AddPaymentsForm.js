import React, { useState, useRef } from "react";
import {
  fetchPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "servicesdirectory/api";

import "./PaymentsForm.css";

const AddPaymentsForm = () => {
  const formRef = useRef(null);

  const [payments, setPayments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [AppointmentID, setAppointmentID] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [PaymentStatus, setPaymentStatus] = useState("");
  const [Amount, setAmount] = useState("");
  const [PaidAt, setPaidAt] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchPayments();
      setPayments(data);
      setShowPayments(true);
    } catch (error) {
      console.error("Failed to fetch payments:", error.message);
    }
  };

  const unloadData = () => {
    setPayments([]);
    setShowPayments(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setAppointmentID("");
    setPaymentMethod("");
    setPaymentStatus("");
    setAmount("");
    setPaidAt("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payment = {
    AppointmentID,
    PaymentMethod,
    PaymentStatus,
    Amount: parseFloat(Amount),
    PaidAt,
  };
  
  console.log("Submitting payment:", payment);

  try {
    if (editingId) {
      console.log("Updating payment with ID:", editingId);
      await updatePayment(editingId, payment);
      alert("Payment updated successfully.");
    } else {
      console.log("Creating payment");
      await createPayment(payment);
      alert("Payment added successfully.");
    }

    await fetchData();
    setShowPayments(true);
    resetForm();
  } catch (err) {
    console.error("Payment operation failed:", err.message);
    alert("Failed to submit payment.");
  }
};

const handleEdit = (payment) => {
  console.log("Editing payment:", payment);
  setEditingId(payment.PaymentID);
  setAppointmentID(payment.AppointmentID);
  setPaymentMethod(payment.PaymentMethod);
  setPaymentStatus(payment.PaymentStatus);
  setAmount(payment.Amount);
  setPaidAt(payment.PaidAt?.slice(0, 16)); // for datetime-local input

  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await deletePayment(id);
      alert("Payment deleted successfully.");
      fetchData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete payment.");
    }
  };

  return (
    <div className="payments-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit" : "Add"} Payment</h2>

        {editingId && (
          <div>
            <label>Payment ID</label>
            <input type="text" value={editingId} readOnly />
          </div>
        )}

        <input
          type="text"
          placeholder="Appointment ID"
          value={AppointmentID}
          onChange={(e) => setAppointmentID(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Payment Method"
          value={PaymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />

        <select
          value={PaymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
          <option value="failed">Failed</option>
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          value={PaidAt}
          onChange={(e) => setPaidAt(e.target.value)}
          required
        />

        <div className="action-buttons">
          <button type="submit">{editingId ? "Update" : "Add"}</button>
          <button type="button" onClick={fetchData}>
            Load
          </button>
          <button type="button" onClick={unloadData}>
            Unload
          </button>
          <button type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {showPayments && (
        <>
          <h3>Existing Payments</h3>
          {payments.length === 0 ? (
            <p>No payments found.</p>
          ) : (
            <table className="payments-table">
              <thead>
                <tr>
                  <th>PaymentID</th>
                  <th>AppointmentID</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Paid At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.PaymentID}>
                    <td>{p.PaymentID}</td>
                    <td>{p.AppointmentID}</td>
                    <td>{p.PaymentMethod}</td>
                    <td>{p.PaymentStatus}</td>
                    <td>${parseFloat(p.Amount).toFixed(2)}</td>
                    <td>{p.PaidAt}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEdit(p)}>Edit</button>
                      <button onClick={() => handleDelete(p.PaymentID)}>Delete</button>
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

export default AddPaymentsForm;
