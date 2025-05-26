import { transformDateField } from "../utils/utils";

const API_URL = "http://localhost:5001/api";

// Clients API
export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) throw new Error("Failed to fetch clients");

    const clients = await response.json();
    // Use transformDateField to format the 'CreatedAt' field
    return transformDateField(clients, "CreatedAt");
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};

export const createClient = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create client");
    return await response.json();
  } catch (error) {
    console.error("Error creating client:", error);
    return null;
  }
};

// Services API
export const fetchServices = async () => {
  const response = await fetch("http://localhost:5001/api/services");

  const contentType = response.headers.get("content-type");
  console.log("Response Content-Type:", contentType); // ✅ log this

  if (!response.ok) {
    const text = await response.text(); // read the error body
    console.error("Error response body:", text); // ✅ show what failed
    throw new Error("Failed to fetch services");
  }

  return await response.json();
};


// export const fetchServices = async () => {
//   const response = await fetch("http://localhost:5001/api/services");
//   const json = await response.json();
//   if (json.status === "success" && Array.isArray(json.data)) {
//     return json.data; // ✅ return the actual services array
//   } else {
//     throw new Error("Invalid data format received from backend");
//   }
// };

/*export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    const clients = await response.json();
    return clients;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};*/

/*export const createService = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create service");
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    return null;
  }
};*/

export const createService = async (serviceData) => {
  // Convert PascalCase to camelCase
  const formattedService = {
    serviceName: serviceData.ServiceName,
    description: serviceData.Description,
    minDuration: Number(serviceData.MinDuration),
    maxDuration: Number(serviceData.MaxDuration),
    minPrice: Number(serviceData.MinPrice),
    maxPrice: Number(serviceData.MaxPrice),
  };

  const response = await fetch("http://localhost:5001/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([formattedService]), // backend expects array
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create service");
  }

  return await response.json();
};

// Fetch payments and transform the 'date' field
export const fetchPayments = async () => {
  try {
    const response = await fetch(`${API_URL}/payments`);
    if (!response.ok) throw new Error("Failed to fetch payments");

    const payments = await response.json();
    // Use transformDateField to format the 'date' field
    return transformDateField(payments, "date");
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};
export const createPayment = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create payment");
    return await response.json();
  } catch (error) {
    console.error("Error creating payment:", error);
    return null;
  }
};

// Staff API
export const fetchStaff = async () => {
  try {
    const response = await fetch(`${API_URL}/staff`);
    if (!response.ok) throw new Error("Failed to fetch staff");
    const staff = await response.json(); // Changed `clients` to `staff`
    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return []; // Return empty array if there's an error
  }
};

export const createStaff = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create staff");
    return await response.json();
  } catch (error) {
    console.error("Error creating staff:", error);
    return null;
  }
};

// Staff Schedule API
export const fetchStaffSchedules = async () => {
  try {
    const response = await fetch(`${API_URL}/staff-schedules`);
    if (!response.ok) throw new Error("Failed to fetch staff schedules");
    const clients = await response.json();
    return clients;
  } catch (error) {
    console.error("Error fetching staff schedules:", error);
    return [];
  }
};

export const createStaffSchedule = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/staff-schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create staff schedule");
    return await response.json();
  } catch (error) {
    console.error("Error creating staff schedule:", error);
    return null;
  }
};

// Fetch appointments and transform the 'date' field
export const fetchAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/appointments`);
    if (!response.ok) throw new Error("Failed to fetch appointments");

    const appointments = await response.json();
    // Use transformDateField to format the 'date' field
    return transformDateField(appointments, "date");
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const createAppointment = async (clients) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clients),
    });
    if (!response.ok) throw new Error("Failed to create appointment");
    return await response.json();
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
};
