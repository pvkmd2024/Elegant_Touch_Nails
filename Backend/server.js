require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Route imports
const clientRoutes = require("./routes/clientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const staffScheduleRoutes = require("./routes/staffScheduleRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin for production if needed
  })
);
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
// app.use((req, res, next) => {
//   console.log(`Request: ${req.method} ${req.url}`);
//   if (req.method === "POST" || req.method === "PUT") {
//     console.log("Request body:", req.body);
//   }
//   next();
// });

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", serviceRoutes);
app.use("/api", staffRoutes);
app.use("/api/staffSchedule", staffScheduleRoutes);

// Example route for testing service addition
app.post("/api/services", (req, res) => {
  const services = req.body;
  console.log(services);
  res.status(201).json({ message: "Services added successfully", services });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.type === "validation") {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
});

// app.use((err, req, res, next) => {
//   console.error("Error stack:", err.stack);
//   if (err.type === "validation") {
//     return res.status(400).json({ error: err.message });
//   }
//   return res.status(500).json({ error: "Internal Server Error" });
// });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
