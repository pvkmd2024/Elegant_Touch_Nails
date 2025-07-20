const db = require("../config/db");

const Service = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM Services");
    return rows;
  },

  async getById(ServiceID) {
    const [rows] = await db.query("SELECT * FROM Services WHERE ServiceID = ?", [ServiceID]);
    return rows[0] || null;
  },

async create(service) {
  const {
    ServiceName,
    Description,
    MinDuration,
    MaxDuration,
    MinPrice,
    MaxPrice,
  } = service;

  const [result] = await db.query(
    `INSERT INTO Services (
      ServiceName, Description, MinDuration, MaxDuration, MinPrice, MaxPrice
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [ServiceName, Description, MinDuration, MaxDuration, MinPrice, MaxPrice]
  );

  return {
    insertId: result.insertId,
    ...service,
  };
},

  async update(ServiceID, service) {
    const {
      ServiceName,
      Description,
      MinDuration,
      MaxDuration,
      MinPrice,
      MaxPrice,
    } = service;

    const [result] = await db.query(
      `UPDATE Services 
       SET ServiceName = ?, Description = ?, MinDuration = ?, MaxDuration = ?, MinPrice = ?, MaxPrice = ?
       WHERE ServiceID = ?`,
      [ServiceName, Description, MinDuration, MaxDuration, MinPrice, MaxPrice, ServiceID]
    );

    return result.affectedRows > 0 ? { ServiceID, ...service } : null;
  },

  async delete(ServiceID) {
    const [result] = await db.query("DELETE FROM Services WHERE ServiceID = ?", [ServiceID]);
    return result.affectedRows > 0;
  },
};

module.exports = Service;
