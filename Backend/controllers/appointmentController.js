const Appointment = require("../models/appointmentModel");

exports.createAppointment = async (req, res) => {
  const appointments = req.body; // Array of appointments

  if (!Array.isArray(appointments) || appointments.length === 0) {
    return res.status(400).json({ error: "Appointments data is required" });
  }

  try {
    // Loop through the appointments and create each one
    const results = [];
    for (const appointment of appointments) {
      const { clientID, serviceId, appointmentDate, status } = appointment;

      // Validate that each appointment has the required fields
      if (!clientID || !serviceId || !appointmentDate || !status) {
        return res.status(400).json({
          error:
            "All fields are required for each appointment (clientID, serviceId, appointmentDate, status)",
        });
      }

      const result = await Appointment.create({
        clientID,
        serviceId,
        appointmentDate,
        status,
      });
      results.push(result);
    }

    res
      .status(201)
      .json({ message: "Appointments created successfully", results });
  } catch (error) {
    console.error("Error creating appointments:", error);
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
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
