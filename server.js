require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const clientRoutes = require("./routes/clientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const staffScheduleRoutes = require("./routes/staffScheduleRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/routes", clientRoutes);
app.use("/routes", appointmentRoutes);
app.use("/routes", paymentRoutes);
app.use("/routes", serviceRoutes);
app.use("/routes", staffRoutes);
app.use("/routes", staffScheduleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
