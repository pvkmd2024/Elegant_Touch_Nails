const db = require("../config/db");

class Appointment {
  static async create({ clientID, serviceID, appointmentDate, status }) {
    if (
      clientID === undefined ||
      serviceID === undefined ||
      appointmentDate === undefined ||
      status === undefined
    ) {
      throw new Error("Required fields cannot be undefined");
    }

    const sql = `INSERT INTO Appointments (ClientID, ServiceID, AppointmentDate, Status) VALUES (?, ?, ?, ?)`;

    const [result] = await db.execute(sql, [
      clientID,
      serviceID,
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
  static async getByID() {
    const sql = `SELECT * FROM Appointments`;
    const [rows] = await db.execute(sql);
    return rows;
  }
  // Delete an appointment by ID
  static async delete(id) {
    const sql = `DELETE FROM Appointments WHERE AppointmentID = ?`;
    try {
      const [result] = await db.execute(sql, [id]);
      return result;
    } catch (error) {
      console.error("Error in delete method:", error);
      throw error;
    }
  }

  // Update an appointment
  static async update(id, updates) {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    const sql = `UPDATE Appointments SET ${fields} WHERE AppointmentID = ?`;
    try {
      const [result] = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  }
}

module.exports = Appointment;
