const db = require("../config/db");

class Appointment {
  static async create({ ClientID, ServiceID, AppointmentDate, Status }) {
    if (
      ClientID === undefined ||
      ServiceID === undefined ||
      AppointmentDate === undefined ||
      Status === undefined
    ) {
      throw new Error("Required fields cannot be undefined");
    }

    const sql = `INSERT INTO Appointments (ClientID, ServiceID, AppointmentDate, Status) VALUES (?, ?, ?, ?)`;

    const [result] = await db.execute(sql, [
      ClientID,
      ServiceID,
      AppointmentDate,
      Status,
    ]);
    return result;
  }
  static async getAll() {
    const sql = `SELECT * FROM Appointments`;
    const [rows] = await db.execute(sql);
    return rows;
  }
  
  static async getById(id) {
  const sql = `SELECT * FROM Appointments WHERE AppointmentID = ?`;
  try {
    const [rows] = await db.execute(sql, [id]);
    return rows[0]; // or return rows if you want to return an array
  } catch (error) {
    console.error("Error in getById method:", error);
    throw error;
  }
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
