const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Route to create staff
router.post("/staff", staffController.createStaff);

// Route to get all staff
router.get("/staff", staffController.getAllStaff);

// Route to get an staff by ID
router.get("/staff/:id", staffController.getStaffById);

module.exports = router;
