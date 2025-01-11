const Staff = require("../models/staffModel");

exports.createStaff = async (req, res) => {
  try {
    const { fullName, role, email, passwordHash } = req.body;
    const result = await Staff.create({ fullName, role, email, passwordHash });
    res.status(201).json({ message: "Staff created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.getAll();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await Staff.getById(staffId);
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
