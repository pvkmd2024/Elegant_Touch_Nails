const Service = require("../models/serviceModel");

// Create a new service
exports.createService = async (req, res) => {
  try {
    const {
      serviceName,
      description,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    } = req.body;

    if (
      isNaN(minDuration) ||
      isNaN(maxDuration) ||
      isNaN(minPrice) ||
      isNaN(maxPrice)
    ) {
      return res
        .status(400)
        .json({ message: "Duration and price values must be numbers" });
    }

    const newService = await Service.create({
      serviceName,
      description,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    });

    res
      .status(201)
      .json({ message: "Service created successfully", result: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.getAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a service by its ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.getById(serviceId);

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service by its ID
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const {
      serviceName,
      description,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    } = req.body;

    if (
      isNaN(minDuration) ||
      isNaN(maxDuration) ||
      isNaN(minPrice) ||
      isNaN(maxPrice)
    ) {
      return res
        .status(400)
        .json({ message: "Duration and price values must be numbers" });
    }

    const updatedService = await Service.update(serviceId, {
      serviceName,
      description,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    });

    if (updatedService) {
      res.status(200).json({
        message: "Service updated successfully",
        result: updatedService,
      });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service by its ID
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const result = await Service.delete(serviceId);

    if (result) {
      res.status(200).json({ message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
