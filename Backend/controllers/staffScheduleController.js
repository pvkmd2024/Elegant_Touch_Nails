const db = require('../config/db'); // adjust this path to your db connection
const StaffSchedule = require("../models/staffScheduleModel");

exports.createStaffSchedule = async (req, res) => {
  try {
    const newSchedule = await StaffSchedule.create(req.body);
    res.status(201).json(newSchedule); 
  } catch (err) {
    console.error("Error creating schedule:", err);
    res.status(500).json({ error: "Failed to create schedule" });
  }
};


exports.getAllStaffSchedules = async (req, res) => {
  try {
    const schedules = await StaffSchedule.getAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching staff schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

exports.getStaffScheduleByStaffID = async (req, res) => {
  try {
    const { StaffID } = req.params;
    const schedules = await StaffSchedule.getByStaffID(StaffID);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching staff schedule by ID:", error);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
};
// Update staff schedule by staff ID


exports.updateStaffSchedule = async (req, res) => {
  try {
    const scheduleID = req.params.id; // URL param: /api/staffschedules/:id
    const { StaffID, DayOfWeek, StartTime, EndTime } = req.body;

    // Validate input
    if (!StaffID || !DayOfWeek || !StartTime || !EndTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // SQL update
    const updateQuery = `
      UPDATE StaffSchedule
      SET StaffID = ?, DayOfWeek = ?, StartTime = ?, EndTime = ?
      WHERE ScheduleID = ?
    `;

    const [result] = await db.execute(updateQuery, [
      StaffID,
      DayOfWeek,
      StartTime,
      EndTime,
      scheduleID
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Staff schedule not found" });
    }

    res.status(200).json({
      message: "Schedule updated successfully",
      result
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete staff schedule by staff ID
exports.deleteStaffSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM StaffSchedule WHERE ScheduleID = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
