const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

//get all services
router.get("/", serviceController.getAllServices);

//get a service by ID
router.get("/:id", serviceController.getServiceById);

//create a new service
router.post("/", serviceController.createService);

// pdate a service
router.put("/:id", serviceController.updateService);

//delete a service
router.delete("/:id", serviceController.deleteService);

module.exports = router;
