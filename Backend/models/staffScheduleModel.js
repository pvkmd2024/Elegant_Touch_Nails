const db = require("../config/db");

class StaffSchedule {
  static async create(scheduleData) {
    const sql = `
      INSERT INTO StaffSchedule (StaffID, DayOfWeek, StartTime, EndTime) VALUES (?,?,?,?)
    `;
    const params = [
      scheduleData.staffId || null,
      scheduleData.dayOfWeek || null,
      scheduleData.startTime || null,
      scheduleData.endTime || null,
    ];

    try {
      const [result] = await db.execute(sql, params);
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
