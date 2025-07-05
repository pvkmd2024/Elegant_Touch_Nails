const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const hardcodedUser = {
  StaffID: 1,
  FullName: "John Downer",
  Email: "john2520@eleganttouch.com",
  Password: "2b$10$sNG7Kk71JJrYQrNxbGWfNOw0pH.zALEnz3yiy17PzWOYo5hzgbMO6", // hashed "FJHFFJY"
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
      role === "Manager" && 
      email === hardcodedUser.Email && 
      (await bcrypt.compare(password, hardcodedUser.Password))
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

    const isMatch = await bcrypt.compare(password, user[0].Password);
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
// routes/login.js or controllers/authController.js
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Staff = require("../models/staffModel");
// const Client = require("../models/clientModel");

// const JWT_SECRET = "your_secret_key"; // Store in env in production

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//    let user;

// if (role === "Manager") {
//   user = await Staff.findOne({ where: { Email: email, Role: "Manager" } });
// } else if (role === "Staff") {
//   user = await Staff.findOne({ where: { Email: email, Role: "Staff" } });
// } else if (role === "Client") {
//   user = await Client.findOne({ where: { Email: email } });
// } else {
//   return res.status(400).json({ error: "Invalid role" });
// }

//     if (!user) return res.status(401).json({ error: "User not found" });

//     const passwordMatch = await bcrypt.compare(password, user.Password);
//     if (!passwordMatch) return res.status(401).json({ error: "Invalid password" });

//     const token = jwt.sign(
//       {
//         email: user.Email,
//         role: role,
//         fullName: user.FullName,
//         accessLevel: role === "Manager" ? "full" : "limited",
//       },
//       JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.status(200).json({
//       token,
//       role,
//       accessLevel: role === "Manager" ? "full" : "limited",
//       user: { fullName: user.FullName },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// require("dotenv").config();
// console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Staff = require("../models/staffModel");
// const Client = require("../models/clientModel");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
// const loginUser = async (req, res) => {
//   const { email, password, role } = req.body;
  
//   console.log("Login request body:", req.body); // DEBUG
//   console.log("Received Email:", email, "Password:", password, "Role:", role); // DEBUG

//   if (!email || !password || !role) {
//     return res.status(400).json({ error: "Email, password, and role are required." });
//   }

//   try {
//     let user = null;

//     if (role === "Staff" || role === "Salon Manager") {
//       const allStaff = await Staff.getAll();
//       user = allStaff.find((s) => s.Email === email && s.Role === role);
//     } else if (role === "Client") {
//       const allClients = await Client.getAll();
//       user = allClients.find((c) => c.Email === email);
//     } else {
//       return res.status(400).json({ error: "Invalid role specified." });
//     }

//     if (!user) {
//       return res.status(401).json({ error: "User not found." });
//     }
// console.log("Stored hash:", user.Password);
// console.log("Entered password:", password);

//     const isMatch = await bcrypt.compare(password, user.Password);
//     console.log("Password match result:", isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid password." });
//     }

//     // Define access level based on role
//     const accessLevel = role === "Salon Manager" ? "admin" :
//                         role === "Staff" ? "staff" : "client";

//     // Create JWT token
//     const token = jwt.sign(
//       {
//         id: user.StaffID || user.ClientID,
//         email: user.Email,
//         role: role,
//         accessLevel: accessLevel,
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.StaffID || user.ClientID,
//         fullName: user.FullName,
//         email: user.Email,
//         role,
//         accessLevel,
//       },
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error during login." });
//   }
// };

// module.exports = { loginUser };

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("../config/db");

// const hardcodedUser = {
//   StaffID: 1,
//   FullName: "John Downer",
//   Email: "john2520@eleganttouch.com",
//   PasswordHash: "$2b$10$sNG7Kk71JJrYQrNxbGWfNOw0pH.zALEnz3yiy17PzWOYo5hzgbMO6", // hashed "FJHFFJY"
//   AccessLevel: "Manager",
//   Role: "Salon Manager",
// };

// exports.loginUser = async (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return res.status(400).json({ message: "Missing credentials" });
//   }

//   try {
//     // ✅ Hardcoded Manager Login
//     if (
//       role === "Salon Manager" &&
//       email === hardcodedUser.Email &&
//       (await bcrypt.compare(password, hardcodedUser.PasswordHash))
//     ) {
//       const tokenPayload = {
//         id: hardcodedUser.StaffID,
//         role: hardcodedUser.Role,
//         accessLevel: hardcodedUser.AccessLevel,
//       };

//       const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "secret", {
//         expiresIn: "1h",
//       });

//       return res.status(200).json({
//         token,
//         role: hardcodedUser.Role,
//         accessLevel: hardcodedUser.AccessLevel,
//         user: hardcodedUser,
//       });
//     }

//     // ✅ Client or Staff login
//     let query = "";
//     if (role === "Client") {
//       query = "SELECT * FROM Clients WHERE Email = ?";
//     } else {
//       query = "SELECT * FROM Staff WHERE Email = ?";
//     }

//     const [rows] = await db.query(query, [email]);
//     const user = rows[0];

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.PasswordHash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const tokenPayload = {
//       id: role === "Client" ? user.ClientID : user.StaffID,
//       role,
//       accessLevel: role === "Client" ? "Client" : user.AccessLevel || "Staff",
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "secret", {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({
//       token,
//       role,
//       accessLevel: tokenPayload.accessLevel,
//       user,
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
