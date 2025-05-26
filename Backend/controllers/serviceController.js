const Service = require("../models/serviceModel");

// Helper: Validate service fields
const isValidService = (service) => {
  const {
    serviceName,
    description,
    minDuration,
    maxDuration,
    minPrice,
    maxPrice,
  } = service;

  return (
    serviceName &&
    description &&
    !isNaN(minDuration) &&
    !isNaN(maxDuration) &&
    !isNaN(minPrice) &&
    !isNaN(maxPrice)
  );
};

// Helper: Send error response
const sendError = (res, code, message) => {
  return res.status(code).json({ status: "error", message });
};

// Helper: Optional development logging
const logError = (context, error) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(`${context}:`, error.message);
  }
};

// GET all services

const db = require("../config/db");

exports.getAllServices = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM services");
    res.json(rows); // ✅ Correct format
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};





// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.getAll();
//     res.status(200).json({ status: "success", data: services });
//   } catch (error) {
//     logError("getAllServices", error);
//     sendError(res, 500, "Failed to fetch services");
//   }
// };

// GET a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceID = req.params.id;
    if (isNaN(serviceID)) {
      return sendError(res, 400, "Invalid service ID");
    }

    const service = await Service.getById(serviceID);
    if (!service) {
      return sendError(res, 404, "Service not found");
    }

    res.status(200).json({ status: "success", data: service });
  } catch (error) {
    logError("getServiceById", error);
    sendError(res, 500, "Failed to fetch service");
  }
};

// POST: Create multiple services
exports.createService = async (req, res) => {
  try {
    const services = req.body;

    if (!Array.isArray(services) || services.length === 0) {
      return sendError(res, 400, "Request body must be an array of services");
    }

    for (const service of services) {
      if (!isValidService(service)) {
        return sendError(res, 400, "Invalid service data provided");
      }
    }

    const newServices = await Service.create(services);
    res.status(201).json({
      status: "success",
      message: "Services created successfully",
      data: newServices,
    });
  } catch (error) {
    logError("createService", error);
    sendError(res, 500, "Failed to create services");
  }
};

// PUT: Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const serviceID = req.params.id;
    const updatedData = req.body;

    if (!isValidService(updatedData)) {
      return sendError(res, 400, "Invalid service data");
    }

    const updatedService = await Service.update(serviceID, updatedData);

    if (!updatedService) {
      return sendError(res, 404, "Service not found");
    }

    res.status(200).json({
      status: "success",
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    logError("updateService", error);
    sendError(res, 500, "Failed to update service");
  }
};

// DELETE: Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const serviceID = req.params.id;
    const result = await Service.delete(serviceID);

    if (!result) {
      return sendError(res, 404, "Service not found");
    }

    res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    logError("deleteService", error);
    sendError(res, 500, "Failed to delete service");
  }
};