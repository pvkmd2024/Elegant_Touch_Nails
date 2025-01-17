const Client = require("../models/clientModel");

exports.createClients = async (req, res) => {
  try {
    const clients = req.body; // Array of clients
    if (!Array.isArray(clients)) {
      return res.status(400).json({ error: "Expected an array of clients" });
    }

    const clientPromises = clients.map((client, index) => {
      const { fullName, email, phoneNumber, passwordHash, createdAt } = client;

      if (!fullName || !email || !phoneNumber || !passwordHash || !createdAt) {
        return Promise.reject(
          new Error(`Missing required fields for client at index ${index}`)
        );
      }

      return Client.create({
        fullName,
        email,
        phoneNumber,
        passwordHash,
        createdAt,
      });
    });

    // Wait for all insert operations to complete
    await Promise.all(clientPromises);
    res.status(201).json({ message: "Clients added successfully!" });
  } catch (error) {
    console.error("Error in createClients:", error.message); // Debugging
    res.status(500).json({ error: error.message });
  }
};
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};
