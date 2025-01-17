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
    const [rows] = await db.execute(sql);
    return rows;
  }
}

module.exports = Client;
