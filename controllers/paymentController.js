const Payment = require("../models/paymentModel");

exports.createPayment = async (req, res) => {
  try {
    const { appointmentId, paymentMethod, paymentStatus, amount, paidAt } =
      req.body;
    const result = await Payment.create({
      appointmentId,
      paymentMethod,
      paymentStatus,
      amount,
      paidAt,
    });
    res.status(201).json({ message: "Payment created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.getAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.getById(paymentId);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
