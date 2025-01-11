const db = require("../config/db"); // Adjust the path to your db.js

class StaffSchedule {
  static async create() {
    const sql = `
            INSERT INTO StaffSchedule (StaffID, DayOfWeek, StartTime, EndTime) VALUES
            (1, 'Monday', '09:00:00', '17:00:00'),  -- John Doe's schedule
            (1, 'Tuesday', '09:00:00', '17:00:00'),  -- John Doe's schedule
            (2, 'Monday', '08:00:00', '16:00:00'),  -- Jane Smith's schedule
            (2, 'Wednesday', '08:00:00', '16:00:00'),  -- Jane Smith's schedule
            (3, 'Monday', '10:00:00', '18:00:00'),  -- Alice Johnson's schedule
            (3, 'Thursday', '10:00:00', '18:00:00'),  -- Alice Johnson's schedule
            (1, 'Friday', '09:00:00', '17:00:00'),  -- John Doe's schedule
            (2, 'Thursday', '08:00:00', '16:00:00');  -- Jane Smith's schedule
        `;

    try {
      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      console.error("Error inserting staff schedule data:", error);
      throw error;
    }
  }

  static async getAll() {
    const sql = `SELECT * FROM StaffSchedule`;
    const [rows] = await db.execute(sql);
    return rows;
  }
  static async getByStaffId(staffId) {
    const sql = "SELECT * FROM StaffSchedule WHERE StaffID = ?";
    const [rows] = await db.execute(sql, [staffId]);
    return rows;
  }
}

module.exports = StaffSchedule;
