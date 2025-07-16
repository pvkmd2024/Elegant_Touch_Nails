const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const hardcodedUser = {
  StaffID: 1,
  FullName: "John Downer",
  Email: "manager@eleganttouch.com",
  Password: "2b$10$sNG7Kk71JJrYQrNxbGWfNOw0pH.zALEnz3yiy17PzWOYo5hzgbMO6", // hashed "FJHFFJY"
  Role: "Manager",
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login Request Body:", { email, password, role });

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    // ✅ Hardcoded Manager Login
    console.log("🔍 Checking Manager login", {
      emailMatch: email === hardcodedUser.Email,
      passwordInput: password,
      storedPassword: hardcodedUser.Password,
      roleMatch: role === "Manager"
    });

    if (
      role === "Manager" &&
      email === hardcodedUser.Email &&
      (await bcrypt.compare(password, hardcodedUser.Password))
    ) {
      console.log("🟢 Matched hardcoded Manager login");

      const token = jwt.sign(
        { id: hardcodedUser.StaffID, role: hardcodedUser.Role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token,
        role: hardcodedUser.Role,
        user: hardcodedUser,
      });
    }

    // ✅ Dynamic Client or Staff Lookup
    let rows;
    if (role === "Client") {
      [rows] = await db.execute("SELECT * FROM Clients WHERE Email = ?", [email]);
    } else {
      [rows] = await db.execute("SELECT * FROM Staff WHERE Email = ?", [email]);
    }

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log("🧑‍💻 DB rows:", rows);

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: role === "Client" ? user.ClientID : user.StaffID,
        role,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      role,
      user,
    });
  } catch (err) {
    console.error("❌ Server Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
