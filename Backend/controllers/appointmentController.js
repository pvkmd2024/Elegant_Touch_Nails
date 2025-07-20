const Appointment = require("../models/appointmentModel");
console.log("Imported Appointment model:", Appointment);
const db = require('../config/db');

exports.markAsCompleted = (req, res) => {
  const appointmentId = req.params.id;

  const query = 'UPDATE Appointments SET Status = ? WHERE AppointmentID = ?';

  db.query(query, ['Completed', appointmentId], (err, result) => {
    if (err) {
      console.error('Error updating appointment status:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Appointment marked as completed' });
  });
};

exports.createAppointment = async (req, res) => {
  try {
    const { ClientID, ServiceID, AppointmentDate, Status } =
      req.body;
    const result = await Appointment.create({
      ClientID,
      ServiceID,
      AppointmentDate,
      Status,
    });
    console.log(req.body);
    res.status(201).json({ message: "Appointment created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.getById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error getting appointment by ID:", error);
    res.status(500).json({ error: "Failed to retrieve appointment" });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (!appointmentId) {
      return res.status(400).json({ error: "Appointment ID is required" });
    }

    const result = await Appointment.delete(appointmentId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updates = req.body;

    if (!appointmentId || !updates) {
      return res.status(400).json({
        error: "Appointment ID and updates are required",
      });
    }

    const result = await Appointment.update(appointmentId, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
};
