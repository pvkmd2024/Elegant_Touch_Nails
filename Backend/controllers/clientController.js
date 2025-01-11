const Client = require("../models/clientModel");

exports.createClient = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, passwordHash, createdAt } = req.body;
    const result = await Client.create({
      fullName,
      email,
      phoneNumber,
      passwordHash,
      createdAt,
    });
    res.status(201).json({ message: "Client created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
