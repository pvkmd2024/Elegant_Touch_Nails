const db = require("../config/db"); // Your DB connection

const Service = {
  // Fetch all services
  async getAll() {
    const [rows] = await db.query("SELECT * FROM Services");
    return rows;
  },

  // Fetch a service by ID
  async getById(serviceID) {
    const [rows] = await db.query("SELECT * FROM Services WHERE serviceID = ?", [serviceID]);
    return rows[0] || null;
  },

  // Create multiple services
  async create(services) {
    const values = services.map(s => [
      s.serviceName,
      s.description,
      s.minDuration,
      s.maxDuration,
      s.minPrice,
      s.maxPrice,
    ]);

    const placeholders = services.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");

    const sql = `
      INSERT INTO Services (
        serviceName, description, minDuration, maxDuration, minPrice, maxPrice
      )
      VALUES ${placeholders}
    `;

    const flatValues = values.flat();
    const [result] = await db.query(sql, flatValues);

    // Return inserted services or count
    return {
      insertedCount: result.affectedRows,
      insertId: result.insertId,
    };
  },

  // Update a service by ID
  async update(serviceID, service) {
    const {
      serviceName,
      description,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    } = service;

    const [result] = await db.query(
      `UPDATE Services 
       SET serviceName = ?, description = ?, minDuration = ?, maxDuration = ?, minPrice = ?, maxPrice = ?
       WHERE serviceID = ?`,
      [serviceName, description, minDuration, maxDuration, minPrice, maxPrice, serviceID]
    );

    return result.affectedRows > 0 ? { serviceID, ...service } : null;
  },

  // Delete a service by ID
  async delete(serviceID) {
    const [result] = await db.query("DELETE FROM Services WHERE serviceID = ?", [serviceID]);
    return result.affectedRows > 0;
  },
};

module.exports = Service;
