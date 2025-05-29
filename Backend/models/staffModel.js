const db = require("../config/db"); // Adjust the path to your db.js

class Staff {
  static async create(staffData) {
    const sql = `INSERT INTO Staff (FullName, Role, Email, PasswordHash) VALUES (?,?,?,?)`;
    console.log("Staff data received in model:", staffData);

    const params = [
      staffData.FullName || null,
      staffData.Role || null,
      staffData.Email || null,
      staffData.PasswordHash || null,
    ];

    console.log("SQL parameters:", params);
    try {
      const [result] = await db.execute(sql, params);
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

  static async update(id, staffData) {
    const sql = `UPDATE Staff SET FullName = ?, Role = ?, Email = ?, PasswordHash = ? WHERE StaffID = ?`;

    try {
      const [result] = await db.execute(sql, [
        staffData.FullName,
        staffData.Role,
        staffData.Email,
        staffData.PasswordHash,
        id,
      ]);
      return result.affectedRows > 0 ? staffData : null;
    } catch (error) {
      console.error("Error updating staff data:", error);
      throw error;
    }
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM Staff WHERE StaffID = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Staff;
