const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Route to create staff
router.post("/staff", staffController.createStaff);

// Route to get all staff
router.get("/staff", staffController.getAllStaff);

// Route to get an staff by ID
router.get("/staff/:id", staffController.getStaffById);
// Route to update staff by ID
router.put("/staff/:id", staffController.updateStaff);

// Route to delete staff by ID
router.delete("/staff/:id", staffController.deleteStaff);

module.exports = router;
