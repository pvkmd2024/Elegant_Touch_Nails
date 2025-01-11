import React, { useEffect, useState } from "react";
import { fetchPayments } from "../services/api";
import "./PaymentList.css";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetchPayments();
        setPayments(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to fetch payments. Please try again later.");
        setLoading(false); // Set loading to false even in case of error
      }
    };

    fetchPaymentData();
  }, []); // Empty dependency array ensures this runs once after the component mounts

  if (loading) {
    return <div>Loading payments...</div>; // Show loading text while data is fetching
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Show error message if fetching fails
  }

  return (
    <div>
      <h2>Payment Records</h2>
      <table>
        <thead>
          <tr>
            <th>AppointmentID</th>
            <th>PaymentMethod</th>
            <th>PaymentStatus</th>
            <th>Amount</th>
            <th>PaidAt</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.AppointmentID}</td>
              <td>{payment.PaymentMethod}</td>
              <td>{payment.PaymentStatus}</td>
              <td>{payment.Amount}</td>
              <td>{new Date(payment.PaidAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsList;
