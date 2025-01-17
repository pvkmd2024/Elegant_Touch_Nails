const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Create a new appointment
router.post("/appointments", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getAllAppointments);

// Get appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

module.exports = router;
