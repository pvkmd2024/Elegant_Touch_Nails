import React, { useEffect, useState } from "react";
import { fetchPayments } from "../servicesdirectory/api";
import PaymentsList from "../components/Payments/PaymentsList";
import AddPaymentForm from "../components/Payments/AddPaymentForm";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments().then((data) => setPayments(data));
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      <AddPaymentForm />
      <PaymentsList payments={payments} />
    </div>
  );
};

export default PaymentsPage;
