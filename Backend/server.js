require("dotenv").config();
const express = require("express");
const cors = require("cors");

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
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/staff-schedules", staffScheduleRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.type === "validation") {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
