const db = require("../config/db"); // Adjust the path to your db.js

class Payment {
  static async create(paymentData) {
  // Destructure and assign default values if needed
  const {
    AppointmentID,
    PaymentMethod = null,
    PaymentStatus = null,
    Amount = null,
    PaidAt = null,
  } = paymentData;

  // Ensure required fields are present
  if (
    AppointmentID === undefined ||
    PaymentMethod === undefined ||
    PaymentStatus === undefined ||
    Amount === undefined ||
    PaidAt === undefined
  ) {
     console.error("Missing required payment fields.");
    return { error: "Missing required payment fields." };
  }

  // Validate the appointment
  const [rows] = await db.execute(
    `SELECT AppointmentID FROM Appointments 
     WHERE AppointmentID = ? 
     AND AppointmentDate < CURDATE() 
     AND Status IN ('Completed', 'Cancelled')`,
    [AppointmentID]
  );

  if (rows.length === 0) {
     console.error("No eligible appointment found for payment.");
    return { error: "No eligible appointment found for payment." };
  }

  const sql = `INSERT INTO Payments (AppointmentID, PaymentMethod, PaymentStatus, Amount, PaidAt) 
               VALUES (?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.execute(sql, [
  AppointmentID ?? null,
  PaymentMethod ?? null,
  PaymentStatus ?? null,
  Amount ?? null,
  PaidAt ?? null,
]);
console.log("Payment created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}


  static async getAll() {
    const sql = `SELECT * FROM Payments`;
    const [rows] = await db.execute(sql);
    return rows;
  }

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
