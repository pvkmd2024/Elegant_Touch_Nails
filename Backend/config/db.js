const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.execute("SELECT 1")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Connection Error:", err));

module.exports = db;
