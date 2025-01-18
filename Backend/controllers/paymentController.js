const Payment = require("../models/paymentModel");

exports.createPayment = async (req, res) => {
  try {
    const { appointmentID, paymentMethod, paymentStatus, amount, paidAt } =
      req.body;
    const result = await Payment.create({
      appointmentID,
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
exports.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required" });
    }

    const result = await Payment.delete(paymentId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Failed to delete payment" });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const updates = req.body;

    if (!paymentId || !updates) {
      return res.status(400).json({
        error: "Payment ID and updates are required",
      });
    }

    const result = await Payment.update(paymentId, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Failed to update payment" });
  }
};
