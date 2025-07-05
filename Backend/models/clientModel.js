const db = require("../config/db"); // Import the db connection

class Client {
  // Static method to create a new client
 static async create(data) {
   if (!data.FullName || !data.Email || !data.PhoneNumber || !data.Password) {
    throw new Error('FullName, Email, and Password are required fields');
  }

  // Handle optional fields, default to null if undefined
  const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const CreatedAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                  `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;


  const sql = `INSERT INTO Clients (FullName, Email, PhoneNumber, Password, CreatedAt) 
               VALUES (?, ?, ?, ?, ?)`;

  try {
    // Log the query and parameters for debugging purposes
    console.log("Executing query:", sql);
    console.log("With parameters:", [
      data.FullName,
      data.Email,
      data.PhoneNumber,  // Pass null if undefined
      data.Password,
      CreatedAt     // Pass the current date if undefined
    ]);

    const [result] = await db.execute(sql, [
      data.FullName,
      data.Email,
      data.PhoneNumber,  // Pass null if undefined
      data.Password,
      CreatedAt     // Pass the current date if undefined
    ]);

    // Log the result of the insert operation
    console.log("Client created successfully:", result);

    // Ensure result contains the expected values
    if (!result || !result.insertId) {
      throw new Error('Client creation failed: No insertId returned.');
    }

    return result;
  } catch (error) {
    console.error("Error creating client in database:", error.message);  // More specific error logging
    throw new Error(`Database error: ${error.message}`);  // Re-throw with clearer error message
  }
}

  // Static method to get all clients
  static async getAll() {
    const sql = `SELECT * FROM Clients`;
    try {
      const [rows] = await db.execute(sql);
      console.log("Database rows:", rows); // Debugging log
      return rows;
    } catch (error) {
      console.error("Error in getAll method:", error);
      throw error;
    }
  }

  // Static method to delete a client
  static async delete(id) {
    const sql = `DELETE FROM Clients WHERE ClientID = ?`;
    try {
      const [result] = await db.execute(sql, [id]);
      return result;
    } catch (error) {
      console.error("Error in delete method:", error);
      throw error;
    }
  }

  // Static method to update a client's details
  static async update(id, updates) {
    if (!id) {
      throw new Error('Client ID is required for updating');
    }

    const fields = Object.keys(updates);
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const fieldsSet = fields.map((key) => `${key} = ?`).join(", ");
    const values = [...Object.values(updates), id];

    const sql = `UPDATE Clients SET ${fieldsSet} WHERE ClientID = ?`;
    try {
      const [result] = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  }
}

module.exports = Client;
