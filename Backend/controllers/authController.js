const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const hardcodedUser = {
  StaffID: 1,
  FullName: "John Downer",
  Email: "john2520@eleganttouch.com",
  PasswordHash: "$2b$10$sNG7Kk71JJrYQrNxbGWfNOw0pH.zALEnz3yiy17PzWOYo5hzgbMO6", // hashed "FJHFFJY"
  AccessLevel: "Manager",
  Role: "Salon Manager",
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    // Check if user is the hardcoded manager (email & password)
    if (
      role === "Salon Manager" && 
      email === hardcodedUser.Email && 
      (await bcrypt.compare(password, hardcodedUser.PasswordHash))
    ) {
      // Generate token for hardcoded user
      const tokenPayload = {
        id: hardcodedUser.StaffID,
        role: hardcodedUser.Role,
        accessLevel: hardcodedUser.AccessLevel,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
        role: hardcodedUser.Role,
        accessLevel: hardcodedUser.AccessLevel,
        user: hardcodedUser,
      });
    }

    // Existing DB lookup for Clients or Staff
    let user;

    if (role === "Client") {
      [user] = await db.query("SELECT * FROM Clients WHERE Email = ?", [email]);
    } else {
      [user] = await db.query("SELECT * FROM Staff WHERE Email = ?", [email]);
    }

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].PasswordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessLevel = role === "Client" ? "Client" : user[0].AccessLevel;

    const tokenPayload = {
      id: role === "Client" ? user[0].ClientID : user[0].StaffID,
      role,
      accessLevel,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      role,
      accessLevel,
      user: user[0],
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
