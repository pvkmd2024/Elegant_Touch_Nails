import React, { useEffect, useState } from "react";
import { fetchPayments } from "servicesdirectory/api";
import styles from "./PaymentsList.module.css";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const data = await fetchPayments();
        if (Array.isArray(data)) {
          setPayments(data);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch payments. Please try again later.");
        setLoading(false);
      }
    };
    getPayments();
  }, []);

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!Array.isArray(payments)) return <div>Error: Invalid payments format.</div>;

  return (
    <div className={styles.paymentsContainer}>
      <h2 className={styles.pageHeading}>Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className={styles.paymentsTable}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Appointment ID</th>
              <th>Method</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Paid At</th>
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
      <td data-label="Paid At">{p.PaidAt?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsList;
