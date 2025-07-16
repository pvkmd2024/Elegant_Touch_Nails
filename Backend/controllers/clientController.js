const bcrypt = require("bcryptjs");
const Client = require("../models/clientModel");

exports.createClient = async (req, res) => {
  try {
    let clients = req.body;

    // Wrap in array if only one client is passed
    if (!Array.isArray(clients)) {
      clients = [clients];
    }

    const clientPromises = clients.map(async (client, index) => {
      let { FullName, Email, PhoneNumber, Password } = client;

      if (!FullName || !Email || !PhoneNumber || !Password) {
        throw new Error(`Missing fields for client at index ${index}`);
      }

      // Hash password only if not already hashed
      if (!Password.startsWith("$2b$")) {
        Password = await bcrypt.hash(Password, 10);
      }

      return Client.create({ FullName, Email, PhoneNumber, Password });
    });

    const results = await Promise.all(clientPromises);

    res.status(201).json({
      message: "Clients added successfully!",
      inserted: results.length,
    });
  } catch (error) {
    console.error("❌ Error in createClient:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// exports.createClient = async (req, res) => {
//   try {
//     const { FullName, Email, PhoneNumber, Password, CreatedAt } =
//       req.body;
//     const result = await Client.create({
//       FullName,
//       Email,
//       PhoneNumber,
//       Password,
//       CreatedAt,
//     });
//     console.log(req.body);
//     res.status(201).json({ message: "Client created successfully", result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.getAll();
    console.log("Fetched clients:", clients); // Debugging log
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const result = await Client.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Failed to delete client" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !updates) {
      return res
        .status(400)
        .json({ error: "Client ID and updates are required" });
    }

    const result = await Client.update(id, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Failed to update client" });
  }
};
// const bcrypt = require("bcryptjs");
// const Client = require("../models/clientModel");
// exports.createClient = async (req, res) => {
//   try {
//     let clients = req.body;

//     // Wrap single client object into array
//     if (!Array.isArray(clients)) {
//       clients = [clients];
//     }

//     const clientPromises = clients.map(async (client, index) => {
//       let { FullName, Email, PhoneNumber, Password } = client;

//       if (!FullName || !Email || !PhoneNumber || !Password) {
//         throw new Error(`Missing fields for client at index ${index}`);
//       }

//       // Hash only if not already hashed
//       if (!Password.startsWith("$2b$")) {
//         Password = await bcrypt.hash(Password, 10);
//       }

//       return Client.create({ FullName, Email, PhoneNumber, Password });
//     });

//     await Promise.all(clientPromises);
//     res.status(201).json({ message: "Clients added successfully!" });
//   } catch (error) {
//     console.error("Error in createClient:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllClients = async (req, res) => {
//   try {
//     const clients = await Client.getAll();
//     console.log("Fetched clients:", clients); // Debugging log
//     res.status(200).json(clients);
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     res.status(500).json({ error: "Failed to fetch clients" });
//   }
// };
// exports.deleteClient = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Client ID is required" });
//     }

//     const result = await Client.delete(id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Client not found" });
//     }

//     res.status(200).json({ message: "Client deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting client:", error);
//     res.status(500).json({ error: "Failed to delete client" });
//   }
// };

// exports.updateClient = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     if (!id || !updates) {
//       return res
//         .status(400)
//         .json({ error: "Client ID and updates are required" });
//     }

//     const result = await Client.update(id, updates);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Client not found" });
//     }

//     res.status(200).json({ message: "Client updated successfully" });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     res.status(500).json({ error: "Failed to update client" });
//   }
// };
