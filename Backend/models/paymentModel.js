const db = require("../config/db"); // Adjust the path to your db.js

class Payment {
  static async create() {
    // Fetch appointments that are confirmed or completed (excluding future appointments)
    const futureAppointments = await db.execute(`
            SELECT AppointmentID FROM Appointments
            WHERE AppointmentDate < CURDATE() AND Status IN ('Completed', 'Cancelled')
        `);

    if (futureAppointments.length > 0) {
      const sql = `
                INSERT INTO Payments (AppointmentID, PaymentMethod, PaymentStatus, Amount, PaidAt) VALUES
                (1, 'Credit Card', 'completed', 20.00, '2025-01-15 10:45:00'),  -- Alice Johnson's payment for Basic Manicure
(2, 'Cash', 'pending', 30.00, NULL),  -- Bob Smith's payment for Basic Pedicure
(3, 'Credit Card', 'cancelled', 35.00, '2025-01-17 09:45:00'),  -- Charlie Brown's payment for Gel Manicure
(4, 'Debit Card', 'completed', 45.00, '2025-01-18 12:00:00'),  -- Diana Prince's payment for Gel Pedicure
(5, 'Credit Card', 'pending', 50.00, NULL),  -- Edward Cullen's payment for Acrylic Nails
(6, 'Cash', 'completed', 40.00, '2025-01-20 14:15:00'),  -- Fiona Gallagher's payment for Acrylic Fill
(7, 'Debit Card', 'cancelled', 60.00, '2025-01-21 11:30:00'),  -- George Washington's payment for Dip Powder Nails
(8, 'Credit Card', 'pending', 30.00, NULL),  -- Hannah Montana's payment for Nail Art Design
(9, 'Cash', 'completed', 25.00, '2025-01-23 09:30:00'),  -- Customer 9's payment for French Manicure
(10, 'Credit Card', 'completed', 10.00, '2025-01-24 12:30:00'),  -- Customer 10's payment for Paraffin Wax Treatment
(11, 'Debit Card', 'completed', 5.00, '2025-01-25 08:45:00'),  -- Customer 11's payment for Nail Repair
(12, 'Credit Card', 'cancelled', 15.00, '2025-01-26 15:00:00'),  -- Customer 12's payment for Manicure with Paraffin Wax
(13, 'Cash', 'pending', 50.00, NULL)`;

      // Insert the payments data
      const [result] = await db.execute(sql);
      return result;
    }

    // If no payments need to be inserted, just return a message
    return { message: "No payments to insert for the future appointments." };
  }

  static async getAll() {
    const sql = `SELECT * FROM Payments`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Add more CRUD methods as needed
}

module.exports = Payment;
