const StaffSchedule = require("../models/staffScheduleModel");

exports.createStaffSchedule = async (req, res) => {
  try {
    const schedules = req.body; // Expecting an array of schedules
    const results = [];
    for (const schedule of schedules) {
      const result = await StaffSchedule.create(schedule);
      results.push(result);
    }
    res
      .status(201)
      .json({ message: "Schedules created successfully", results });
  } catch (error) {
    console.error("Error creating staff schedules:", error);
    res.status(500).json({ error: "Failed to create schedules" });
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

exports.getStaffScheduleByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const schedules = await StaffSchedule.getByStaffId(staffId);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching staff schedule by ID:", error);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
};
