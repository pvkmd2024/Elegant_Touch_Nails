import React, { useEffect, useState } from "react";
import { fetchPayments } from "servicesdirectory/api";
import "./PaymentsForm.css"; 

const PaymentsList = () => {
  const [payments, setPayments] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getPayments = async () => {
      try {
        const data = await fetchPayments();
        console.log("Fetched payments:", data); // Log the response to verify the data format
        if (Array.isArray(data)) {
          setPayments(data); // Update state if data is an array
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Failed to fetch staff schedules. Please try again later.");
        setLoading(false); // Stop loading in case of error
      }
    };
    getPayments();
  }, []); // Empty dependency array ensures it runs once after mount

  // Check if data is still loading or an error occurred
  if (loading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Ensure that Payments is an array and not undefined
  if (!Array.isArray(payments)) {
    return <div>Error: Payments data is not in expected format.</div>;
  }

  // Render payments data
  return (
    <div className="payments-container">
      <h2 className="page-heading">Payments</h2>
      {payments.length === 0 ? (
        <p>No Payments data available.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>         
              <th>Appointment ID</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Amount</th>
              <th>PaidAt</th>
              </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.PaymentID}>
                <td>{payment.AppointmentID}</td>
                <td>{payment.PaymentMethod}</td>
                <td>{payment.PaymentStatus}</td>
                <td>{payment.Amount}</td>
                <td>{payment.PaidAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsList;
