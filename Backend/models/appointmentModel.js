const db = require("../config/db");

class AppointmentsModel {
  static async create(data) {
    const sql = `INSERT INTO Appointments (ClientID, ServiceID, AppointmentDate, Status) VALUES (?, ?, ?, ?)`;
    const params = [data.ClientID, data.ServiceID, data.AppointmentDate, data.Status];
    const [result] = await db.execute(sql, params);
    return result;
  }

  // Get all appointments
  static async getAll() {
    const sql = `SELECT * FROM Appointments ORDER BY AppointmentDate DESC`;

    try {
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }

  // Get appointment by ID
  static async getById(appointmentId) {
    const sql = `SELECT * FROM Appointments WHERE AppointmentID = ?`;

    try {
      const [rows] = await db.execute(sql, [appointmentId]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      throw error;
    }
  }

 static async update(id, data) {
    const sql = `UPDATE Appointments SET ClientID=?, ServiceID=?, AppointmentDate=?, Status=? WHERE AppointmentID=?`;
    const params = [data.ClientID, data.ServiceID, data.AppointmentDate, data.Status, id];
    const [result] = await db.execute(sql, params);
    return result.affectedRows > 0;
  }

  // Delete appointment
  static async delete(appointmentId) {
    const sql = `DELETE FROM Appointments WHERE AppointmentID = ?`;

    try {
      const [result] = await db.execute(sql, [appointmentId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  }
}

module.exports = AppointmentsModel;
