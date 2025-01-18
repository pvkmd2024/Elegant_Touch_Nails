const Staff = require("../models/staffModel");

exports.createStaff = async (req, res) => {
  try {
    const staffMembers = req.body; // Array of staff members

    if (!Array.isArray(staffMembers)) {
      return res
        .status(400)
        .json({ error: "Expected an array of staff members" });
    }

    const staffPromises = staffMembers.map((staff, index) => {
      const { fullname, role, email, passwordHash } = staff;

      if (!fullname || !role || !email || !passwordHash) {
        return Promise.reject(
          new Error(
            `Missing required fields for staff member at index ${index}`
          )
        );
      }

      return Staff.create({
        fullname,
        role,
        email,
        passwordHash,
      });
    });

    // Wait for all insert operations to complete
    await Promise.all(staffPromises);

    res.status(201).json({ message: "Staff members added successfully!" });
  } catch (error) {
    console.error("Error in createStaff:", error.message); // Debugging
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await StaffModel.getAll();
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const staffID = req.params.id;
    const staff = await Staff.getById(staffID);
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateStaff = async (req, res) => {
  try {
    const staffID = req.params.id;
    const { fullname, role, email, passwordHash } = req.body;

    if (!fullname || !role || !email || !passwordHash) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedStaff = await Staff.update(staffID, {
      fullname,
      role,
      email,
      passwordHash,
    });

    if (updatedStaff) {
      res
        .status(200)
        .json({ message: "Staff updated successfully", result: updatedStaff });
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staffID = req.params.id;
    const result = await Staff.delete(staffID);

    if (result) {
      res.status(200).json({ message: "Staff member deleted successfully" });
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
