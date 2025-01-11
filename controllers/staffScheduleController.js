const StaffSchedule = require("../models/staffScheduleModel");

exports.createStaffSchedule = async (req, res) => {
  try {
    const { staffId, dayOfWeek, startTime, endTime } = req.body;
    const result = await StaffSchedule.create({
      staffId,
      dayOfWeek,
      startTime,
      endTime,
    });
    res
      .status(201)
      .json({ message: "Staff schedule created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await StaffSchedule.getAll();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getScheduleByStaffId = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const schedule = await StaffSchedule.getByStaffId(staffId);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res
        .status(404)
        .json({ message: "Schedule not found for this staff member" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
