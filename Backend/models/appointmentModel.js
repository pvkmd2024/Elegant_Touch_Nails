const db = require("../config/db");

class Appointment {
  static async create({ clientId, serviceId, appointmentDate, status }) {
    if (
      clientId === undefined ||
      serviceId === undefined ||
      appointmentDate === undefined ||
      status === undefined
    ) {
      throw new Error("Required fields cannot be undefined");
    }

    const sql = `INSERT INTO Appointments (ClientID, ServiceID, AppointmentDate, Status) VALUES (?, ?, ?, ?)`;

    const [result] = await db.execute(sql, [
      clientId,
      serviceId,
      appointmentDate,
      status,
    ]);
    return result;
  }
  static async getAll() {
    const sql = `SELECT * FROM Appointments`;
    const [rows] = await db.execute(sql);
    return rows;
  }
  static async getById() {
    const sql = `SELECT * FROM Appointments`;
    const [rows] = await db.execute(sql);
    return rows;
  }
  // Add more CRUD methods as needed
}

module.exports = Appointment;
