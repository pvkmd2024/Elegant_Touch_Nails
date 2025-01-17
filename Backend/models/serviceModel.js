const db = require("../config/db");

class Service {
  // Create services
  static async create(services) {
    const placeholders = services.map(() => `(?, ?, ?, ?, ?, ?)`).join(", ");
    const values = services.flatMap((service) => [
      service.serviceName,
      service.description,
      service.minDuration,
      service.maxDuration,
      service.minPrice,
      service.maxPrice,
    ]);

    const sql = `INSERT INTO Services (ServiceName, Description, MinDuration, MaxDuration, MinPrice, MaxPrice) VALUES ${placeholders}`;

    const connection = await db.getConnection(); // Acquire a connection for transaction

    try {
      await connection.beginTransaction(); // Start a transaction
      const [result] = await connection.query(sql, values);
      await connection.commit(); // Commit the transaction
      return result;
    } catch (error) {
      await connection.rollback(); // Rollback the transaction on error
      console.error("Error in Service.create with transaction:", error.message);
      throw error;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  }

  // Get all services
  static async getAll() {
    const sql = `SELECT * FROM Services`;
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error in Service.getAll:", error.message);
      throw error;
    }
  }

  // Search services by name or description
  static async search(query) {
    const sql = `SELECT * FROM Services WHERE ServiceName LIKE ? OR Description LIKE ?`;
    try {
      const [rows] = await db.query(sql, [`%${query}%`, `%${query}%`]);
      return rows;
    } catch (error) {
      console.error("Error in Service.search:", error.message);
      throw error;
    }
  }

  // Filter services by price range
  static async filterByPrice(minPrice, maxPrice) {
    const sql = `SELECT * FROM Services WHERE MinPrice >= ? AND MaxPrice <= ?`;
    try {
      const [rows] = await db.query(sql, [minPrice, maxPrice]);
      return rows;
    } catch (error) {
      console.error("Error in Service.filterByPrice:", error.message);
      throw error;
    }
  }

  // Sort services
  static async sortBy(column, order = "ASC") {
    const validColumns = [
      "ServiceName",
      "MinPrice",
      "MaxPrice",
      "MinDuration",
      "MaxDuration",
    ];
    if (!validColumns.includes(column)) throw new Error("Invalid column name");

    const sql = `SELECT * FROM Services ORDER BY ${column} ${order}`;
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error in Service.sortBy:", error.message);
      throw error;
    }
  }

  // Paginate results
  static async paginate(limit, offset) {
    const sql = `SELECT * FROM Services LIMIT ? OFFSET ?`;
    try {
      const [rows] = await db.query(sql, [limit, offset]);
      return rows;
    } catch (error) {
      console.error("Error in Service.paginate:", error.message);
      throw error;
    }
  }

  // Batch delete services
  static async batchDelete(serviceIds) {
    const placeholders = serviceIds.map(() => "?").join(", ");
    const sql = `DELETE FROM Services WHERE id IN (${placeholders})`;

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();
      const [result] = await connection.query(sql, serviceIds);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      console.error(
        "Error in Service.batchDelete with transaction:",
        error.message
      );
      throw error;
    } finally {
      connection.release();
    }
  }
}
module.exports = Service;
