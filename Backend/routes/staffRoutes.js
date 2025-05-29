const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Route to create a new staff
router.post("/", staffController.createStaff);
console.log("staffController.createStaff:", staffController.createStaff);

// Route to get all staffs
router.get("/", staffController.getAllStaff);

// Route to get a staff by ID
router.get("/staff/:id", staffController.getStaffById);
// Route to delete a staff by ID
router.delete("/:id", staffController.deleteStaff);

// Route to update a staff by ID
router.put("/:id", staffController.updateStaff);

module.exports = router;
