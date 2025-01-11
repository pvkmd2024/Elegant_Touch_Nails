const Appointment = require("../models/appointmentModel");

exports.createAppointment = async (req, res) => {
  try {
    const { clientId, serviceId, appointmentDate, status } = req.body;
    const result = await Appointment.create({
      clientId,
      serviceId,
      appointmentDate,
      status,
    });
    res
      .status(201)
      .json({ message: "Appointment created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.status(200).json(appointments);
  } catch (error) {
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
