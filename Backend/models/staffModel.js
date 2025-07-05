const db = require("../config/db"); 

class Staff {
  static async create(staffData) {
    const sql = `INSERT INTO Staff (FullName, Role, Email, Password) VALUES (?,?,?,?)`;
    console.log("Staff data received in model:", staffData);

    const params = [
      staffData.FullName || null,
      staffData.Role || null,
      staffData.Email || null,
      staffData.Password || null,
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
  try {
    // Build dynamic query parts
    const fields = [];
    const values = [];

    if (staffData.FullName) {
      fields.push("FullName = ?");
      values.push(staffData.FullName);
    }
    if (staffData.Role) {
      fields.push("Role = ?");
      values.push(staffData.Role);
    }
    if (staffData.Email) {
      fields.push("Email = ?");
      values.push(staffData.Email);
    }
    if (staffData.Password) {
      fields.push("Password = ?");
      values.push(staffData.Password);
    }

    if (fields.length === 0) {
      throw new Error("No fields provided to update");
    }

    const sql = `UPDATE Staff SET ${fields.join(", ")} WHERE StaffID = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
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
