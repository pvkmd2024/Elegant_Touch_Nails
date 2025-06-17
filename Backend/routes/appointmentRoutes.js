const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Create a new appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getAllAppointments);

// Get appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

// Delete an appointment by ID
router.delete("/:id", appointmentController.deleteAppointment);

// Update an appointment by ID
router.put("/:id", appointmentController.updateAppointment);
module.exports = router;
