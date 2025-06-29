import React, { useState, useRef } from "react";
import {
  fetchPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "servicesdirectory/api";

import styles from "./PaymentsForm.module.css";

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
      alert("Failed to load payments.");
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

    try {
      if (editingId) {
        await updatePayment(editingId, payment);
        alert("Payment updated successfully.");
      } else {
        await createPayment(payment);
        alert("Payment added successfully.");
      }

      await fetchData();
      resetForm();
    } catch (err) {
      console.error("Payment operation failed:", err.message);
      alert("Failed to submit payment.");
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment.PaymentID);
    setAppointmentID(payment.AppointmentID);
    setPaymentMethod(payment.PaymentMethod);
    setPaymentStatus(payment.PaymentStatus);
    setAmount(payment.Amount);
    setPaidAt(payment.PaidAt?.slice(0, 16)); // Trim seconds if needed

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
    <div className={styles.paymentsFormContainer} ref={formRef}>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Payment" : "Add Payment"}</h2>

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

        <div className={styles.actionButtons}>
  <button className={styles.addPaymentBtn} type="submit">
    {editingId ? "Update" : "Add"}
  </button>
  <button
    type="button"
    className={styles.loadPaymentsBtn}
    onClick={fetchData}
  >
    Load
  </button>
  <button
    type="button"
    className={styles.unloadPaymentsBtn}
    onClick={unloadData}
  >
    Unload
  </button>
  <button
    type="button"
    className={styles.clearBtn}
    onClick={resetForm}
  >
    Clear
  </button>
</div>
</form>
      {showPayments && (
        <>
          <h2>Existing Payments</h2>
          {payments.length === 0 ? (
            <p>No payments found.</p>
          ) : (
            <table className={styles.paymentsTable}>
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
      <td data-label="Payment ID">{p.PaymentID}</td>
      <td data-label="Appointment ID">{p.AppointmentID}</td>
      <td data-label="Method">{p.PaymentMethod}</td>
      <td data-label="Status">{p.PaymentStatus}</td>
      <td data-label="Amount">${parseFloat(p.Amount).toFixed(2)}</td>
      <td data-label="Paid At">{p.PaidAt.slice(0,10)}</td>
      <td data-label="Actions" className={styles.actionButtons}>
  <div className={styles.actionButtonWrapper}>
    <button
      className={styles.editButton}
      onClick={() => handleEdit(p)}
    >
      Edit
    </button>
    <button
      className={styles.deleteButton}
      onClick={() => handleDelete(p.PaymentID)}
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

export default AddPaymentsForm; 