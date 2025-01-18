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

exports.getStaffScheduleByStaffID = async (req, res) => {
  try {
    const { staffID } = req.params;
    const schedules = await StaffSchedule.getByStaffID(staffID);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching staff schedule by ID:", error);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
};
// Update staff schedule by staff ID
exports.updateStaffSchedule = async (req, res) => {
  try {
    const { staffID } = req.params;
    const { dayOfWeek, startTime, endTime } = req.body;

    if (!dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedSchedule = await StaffSchedule.update(staffID, {
      dayOfWeek,
      startTime,
      endTime,
    });

    if (updatedSchedule) {
      res
        .status(200)
        .json({
          message: "Schedule updated successfully",
          result: updatedSchedule,
        });
    } else {
      res.status(404).json({ message: "Staff schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete staff schedule by staff ID
exports.deleteStaffSchedule = async (req, res) => {
  try {
    const { staffID } = req.params;
    const result = await StaffSchedule.delete(staffID);

    if (result) {
      res.status(200).json({ message: "Schedule deleted successfully" });
    } else {
      res.status(404).json({ message: "Staff schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
