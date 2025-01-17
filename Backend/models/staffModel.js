const db = require("../config/db"); // Adjust the path to your db.js

class Staff {
  static async create(staffData) {
    const sql = `INSERT INTO Staff (FullName, Role, Email, PasswordHash) VALUES (?,?,?,?)`;
    console.log("Staff data received in model:", staffData);

    // Create the parameters array explicitly
    const params = [
      staffData.fullame || null,
      staffData.role || null,
      staffData.email || null,
      staffData.passwordHash || null,
    ];

    console.log("SQL parameters:", params);
    try {
      const [result] = await db.execute(sql, [
        staffData.fullname,
        staffData.role,
        staffData.email,
        staffData.passwordHash,
      ]);
      return result;
    } catch (error) {
      console.error("Error inserting staff data:", error);
      throw error;
    }
  }

  static async getAll() {
    const sql = `SELECT * FROM Staff`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Add more CRUD methods as needed
}

module.exports = Staff;
