import React, { useEffect, useState } from "react";
import { fetchPayments } from "../servicesdirectory/api";
import PaymentsList from "../components/Payments/PaymentsList";
import AddPaymentsForm from "../components/Payments/AddPaymentsForm";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments().then((data) => setPayments(data));
  }, []);

  return (
    <div>
      <AddPaymentsForm />
      <PaymentsList payments={payments} />
    </div>
  );
};

export default PaymentsPage;
