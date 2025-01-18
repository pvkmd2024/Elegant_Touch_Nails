const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Debugging Route
// router.post("/", (req, res) => {
//   console.log("POST /api/clients route hit");
//   res.send("Route working");
// });

// Route to create a new client
router.post("/", clientController.createClients);

// Route to get all clients
router.get("/", clientController.getAllClients);
router.delete("/:id", clientController.deleteClient);
router.put("/:id", clientController.updateClient);

module.exports = router;
