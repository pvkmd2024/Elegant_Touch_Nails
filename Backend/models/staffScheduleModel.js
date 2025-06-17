const db = require("../config/db");

class StaffSchedule {
  static async create(scheduleData) {
    const sql = `
      INSERT INTO StaffSchedule (StaffID, DayOfWeek, StartTime, EndTime) VALUES (?,?,?,?)
    `;
    const params = [
      scheduleData.StaffID || null,
      scheduleData.DayOfWeek || null,
      scheduleData.StartTime || null,
      scheduleData.EndTime || null,
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

  static async getByStaffID(StaffID) {
    const sql = "SELECT * FROM StaffSchedule WHERE StaffID = ?";
    const [rows] = await db.execute(sql, [StaffID]);
    return rows;
  }

  // Update staff schedule by staff ID
  async update(scheduleId, { StaffID, DayOfWeek, StartTime, EndTime }) {
  const [result] = await pool.execute(
    `UPDATE StaffSchedule
     SET StaffID = ?, DayOfWeek = ?, StartTime = ?, EndTime = ?
     WHERE ScheduleID = ?`,
    [StaffID, DayOfWeek, StartTime, EndTime, scheduleId]
  );
  return result;
}

  // Delete staff schedule by staff ID
  static async delete(StaffID) {
    const sql = `DELETE FROM StaffSchedule WHERE StaffID = ?`;

    try {
      const [result] = await db.execute(sql, [StaffID]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting staff schedule data:", error);
      throw error;
    }
  }
}

module.exports = StaffSchedule;
