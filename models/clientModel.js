const db = require("../config/db");

class Client {
  static async create() {
    const sql = `INSERT INTO Clients (FullName, Email, PhoneNumber, PasswordHash, CreatedAt) VALUES
 ('Alice Johnson', 'aliceJ@gmail.com', '+61 1234567890', '5f4dcc3b5aa765d61d8327deb882cf99', '2025-01-01 10:00:00'),
        ('Bob Smith', 'bob.s@hotmail.com', '+61 9876543210', 'e99a18c428cb38d5f260853678922e03', '2025-01-02 11:30:00'),
        ('Charlie Brown', 'bcharlie@outlook.com', '+61 5678901234', 'd8578edf8458ce06fbc5bb76a58c5ca4', '2025-01-03 09:45:00'),
        ('Diana Prince', 'diana.prince@gmail.com', '+61 4567890123', '5d41402abc4b2a76b9719d911017c592', '2025-01-04 14:20:00'),
        ('Edward Cullen', 'edward.cullen@yahoo.com', '61 2345678901', '202cb962ac59075b964b07152d234b70', '2025-01-05 16:45:00'),
        ('Fiona Gallagher', 'fiona.gallagher@outlook.com', '+61 6789012345', '098f6bcd4621d373cade4e832627b4f6', '2025-01-06 12:00:00'),
        ('George Washington', 'george.washington@developerworld.com', '+61 3456789012', '25d55ad283aa400af464c76d713c07ad', '2025-01-07 08:30:00'),
        ('Hannah Montana', 'hannah.montana@yourdomain.org', '+61 5678901234', 'c4ca4238a0b923820dcc509a6f75849b', '2025-01-08 10:15:00')`;

    const [result] = await db.execute(sql);
    return result;
  }

  static async getAll() {
    const sql = `SELECT * FROM Clients`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Add more CRUD methods as needed
}

module.exports = Client;
