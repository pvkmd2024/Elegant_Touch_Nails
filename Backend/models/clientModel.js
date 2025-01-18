const db = require("../config/db"); // Import the db connection

class Client {
  // Static method to create a new client
  static async create(data) {
    const sql = `INSERT INTO Clients (FullName, Email, PhoneNumber, PasswordHash, CreatedAt) 
               VALUES (?, ?, ?, ?, ?)`;

    // You could prepare for multiple clients in bulk insert if needed
    try {
      const [result] = await db.execute(sql, [
        data.fullName,
        data.email,
        data.phoneNumber,
        data.passwordHash,
        data.createdAt,
      ]);
      return result;
    } catch (error) {
      console.error("Error in create method:", error);
      throw error;
    }
  }
  // Static method to get all clients
  static async getAll() {
    const sql = `SELECT * FROM Clients`;
    try {
      const [rows] = await db.execute(sql);
      console.log("Database rows:", rows); // Debugging log
      return rows;
    } catch (error) {
      console.error("Error in getAll method:", error);
      throw error;
    }
  }
  static async delete(id) {
    const sql = `DELETE FROM Clients WHERE ClientID = ?`;
    try {
      const [result] = await db.execute(sql, [id]);
      return result;
    } catch (error) {
      console.error("Error in delete method:", error);
      throw error;
    }
  }

  // Static method to update a client's details
  static async update(id, updates) {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    const sql = `UPDATE Clients SET ${fields} WHERE ClientID = ?`;
    try {
      const [result] = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  }
}

module.exports = Client;
