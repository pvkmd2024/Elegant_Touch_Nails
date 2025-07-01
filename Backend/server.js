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
const authRoutes = require("./routes/authRoutes");


const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
  })
);
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", (req, res, next) => {
  console.log("Staff route hit:", req.method, req.url);
  next();
}, staffRoutes);

app.use("/api/staffSchedules", staffScheduleRoutes);
app.use("/api/auth", authRoutes);
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

app.get("/", (req, res) => {
  res.send("API is running");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
