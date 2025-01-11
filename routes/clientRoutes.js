const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Route to create a new client
router.post("/clients", clientController.createClient);

// Route to get all clients
router.get("/clients", clientController.getAllClients);

module.exports = router;
