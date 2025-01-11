const express = require("express");
const router = express.Router();
const staffScheduleController = require("../controllers/staffScheduleController");

// Route to create a staff schedule
router.post("/staffSchedule", staffScheduleController.createStaffSchedule);

// Route to get all staff schedules
router.get("/staffSchedule", staffScheduleController.getAllStaffSchedule);

// Route to get a staff schedule by staff ID
router.get(
  "/staffSchedule/:staffId",
  staffScheduleController.getStaffScheduleByStaffId
);

module.exports = router;
