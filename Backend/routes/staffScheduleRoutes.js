const express = require("express");
const router = express.Router();
const {
  createStaffSchedule,
  getAllStaffSchedules,
  getStaffScheduleByStaffId,
} = require("../controllers/staffScheduleController");

// Route to create staff schedules
router.post("/", createStaffSchedule);

// Route to get all staff schedules
router.get("/", getAllStaffSchedules);

// Route to get a staff schedule by staff ID
router.get("/:staffId", getStaffScheduleByStaffId);

module.exports = router;
