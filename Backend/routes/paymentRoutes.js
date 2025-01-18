const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to create a new payment
router.post("/payments", paymentController.createPayment);

// Route to get all payments
router.get("/payments", paymentController.getAllPayments);

// Route to get a payment by ID
router.get("/payments/:id", paymentController.getPaymentById);
// Route to delete a payment by ID
router.delete("/payments/:id", paymentController.deletePayment);

// Route to update a payment by ID
router.put("/payments/:id", paymentController.updatePayment);

module.exports = router;
