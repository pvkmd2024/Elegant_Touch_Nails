const db = require("../config/db"); // Adjust the path to your db.js

class Payment {
  static async create() {
    // Fetch appointments that are confirmed or completed (excluding future appointments)
    const futureAppointments = await db.execute(`
            SELECT AppointmentID FROM Appointments
            WHERE AppointmentDate < CURDATE() AND Status IN ('Completed', 'Cancelled')
        `);

    if (futureAppointments.length > 0) {
      const sql = `INSERT INTO Appointments (AppointmentID,PaymentMethod, PaymentStatus, Amount, PaidAt) 
               VALUES (?, ?, ?, ?, ?)`;

      // Insert the payments data
      const [result] = await db.execute(sql);
      return result;
    }

    // If no payments need to be inserted, just return a message
    return { message: "No payments to insert for the future appointments." };
  }

  static async getAll() {
    const sql = `SELECT * FROM Payments`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Delete a payment by ID
  static async delete(id) {
    const sql = `DELETE FROM Payments WHERE PaymentID = ?`;
    try {
      const [result] = await db.execute(sql, [id]);
      return result;
    } catch (error) {
      console.error("Error in delete method:", error);
      throw error;
    }
  }

  // Update a payment
  static async update(id, updates) {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    const sql = `UPDATE Payments SET ${fields} WHERE PaymentID = ?`;
    try {
      const [result] = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  }
}

module.exports = Payment;
