const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Route to create a new appointment
router.post("/appointments", appointmentController.createAppointment);

// Route to get all appointments
router.get("/appointments", appointmentController.getAllAppointments);

// Route to get an appointment by ID
router.get("/appointments/:id", appointmentController.getAppointmentById);

module.exports = router;
