const db = require("../config/db");

class StaffSchedule {
  static async create(scheduleData) {
    const sql = `
      INSERT INTO StaffSchedule (StaffID, DayOfWeek, StartTime, EndTime) VALUES (?,?,?,?)
    `;
    const params = [
      scheduleData.staffID || null,
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

  static async getByStaffID(staffID) {
    const sql = "SELECT * FROM StaffSchedule WHERE StaffID = ?";
    const [rows] = await db.execute(sql, [staffID]);
    return rows;
  }

  // Update staff schedule by staff ID
  static async update(staffID, scheduleData) {
    const sql = `
      UPDATE StaffSchedule 
      SET DayOfWeek = ?, StartTime = ?, EndTime = ? 
      WHERE StaffID = ?
    `;

    try {
      const [result] = await db.execute(sql, [
        scheduleData.dayOfWeek,
        scheduleData.startTime,
        scheduleData.endTime,
        staffID,
      ]);
      return result.affectedRows > 0 ? scheduleData : null;
    } catch (error) {
      console.error("Error updating staff schedule data:", error);
      throw error;
    }
  }

  // Delete staff schedule by staff ID
  static async delete(staffID) {
    const sql = `DELETE FROM StaffSchedule WHERE StaffID = ?`;

    try {
      const [result] = await db.execute(sql, [staffID]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting staff schedule data:", error);
      throw error;
    }
  }
}

module.exports = StaffSchedule;
