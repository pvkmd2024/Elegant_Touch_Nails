const db = require("../config/db"); // Adjust the path to your db.js

class Staff {
  static async create() {
    const sql = `
            INSERT INTO Staff (FullName, Role, Email, PasswordHash) VALUES
            ('John Doe', 'Doctor', 'johndoe@eleganttouch.com', 'FJHFFJYHFD56598'),
            ('Jane Smith', 'Nurse', 'janesmith@eleganttouch.com', 'MVMKHGDGDC887'),
            ('Alice Johnson', 'Receptionist', 'alicejohnson@eleganttouch.com', 'hgkjgkjhlih4746f')
        `;

    try {
      const [result] = await db.execute(sql);
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
