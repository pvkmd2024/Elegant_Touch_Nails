const express = require("express");
const router = express.Router();
const {
  createStaffSchedule,
  getAllStaffSchedules,
  getStaffScheduleByStaffID,
  updateStaffSchedule,
  deleteStaffSchedule,
} = require("../controllers/staffScheduleController");

// Route to create staff schedules
router.post("/", createStaffSchedule);

// Route to get all staff schedules
router.get("/", getAllStaffSchedules);

// Route to get a staff schedule by staff ID
router.get("/:staffID", getStaffScheduleByStaffID);
// Route to update staff schedule by staff ID
router.put("/:staffID", updateStaffSchedule);

// Route to delete staff schedule by staff ID
router.delete("/:staffID", deleteStaffSchedule);
module.exports = router;
