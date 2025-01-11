const db = require("../config/db"); // Adjust the path to your db.js

class Appointment {
  static async create() {
    const sql = `INSERT INTO Appointments (CustomerID, ServiceID, AppointmentDate, Status, CreatedAt, StartTime, EndTime) VALUES
        (1, 1, '2025-01-15', 'Confirmed', '2025-01-01 09:00:00', '10:00:00', '10:45:00'), -- Alice Johnson for Basic Manicure
        (2, 2, '2025-01-16', 'Pending', '2025-01-02 14:00:00', '14:00:00', '15:00:00'), -- Bob Smith for Basic Pedicure
        (3, 3, '2025-01-17', 'Cancelled', '2025-01-03 08:30:00', '09:00:00', '09:45:00'), -- Charlie Brown for Gel Manicure
        (4, 4, '2025-01-18', 'Confirmed', '2025-01-04 10:00:00', '11:00:00', '12:00:00'), -- Diana Prince for Gel Pedicure 
        (5, 5, '2025-01-19', 'Pending', '2025-01-05 15:00:00', '16:00:00', '17:00:00'), -- Edward Cullen for Acrylic Nails
        (6, 6, '2025-01-20', 'Confirmed', '2025-01-06 12:30:00', '13:00:00', '14:15:00'), -- Fiona Gallagher for Acrylic Fill 
        (7, 7, '2025-01-21', 'Cancelled', '2025-01-07 09:15:00', '10:00:00', '11:30:00'), -- George Washington for Dip Powder Nails
        (8, 8, '2025-01-22', 'Pending', '2025-01-08 16:45:00', '17:00:00', '18:00:00'), -- Hannah Montana for Nail Art Design
        (9, 9, '2025-01-23', 'Confirmed', '2025-01-09 08:00:00', '08:30:00', '09:30:00'), -- Customer 9 for French Manicure 
        (10, 10, '2025-01-24', 'Completed', '2025-01-10 11:45:00', '12:00:00', '12:30:00'), -- Customer 10 for Paraffin Wax Treatment 
        (11, 11, '2025-01-25', 'Confirmed', '2025-01-11 07:30:00', '08:00:00', '08:45:00'), -- Customer 11 for Nail Repair 
        (12, 12, '2025-01-26', 'Cancelled', '2025-01-12 14:15:00', '14:30:00', '15:00:00'), -- Customer 12 for Manicure with Paraffin Wax 
        (13, 13, '2025-01-27', 'Pending', '2025-01-13 09:30:00', '10:00:00', '10:20:00'); -- Customer 13 for Hot Stone Pedicure`;

    const [result] = await db.execute(sql);
    return result;
  }

  static async getAll() {
    const sql = `SELECT * FROM Appointments`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Add more CRUD methods as needed
}

module.exports = Appointment;
