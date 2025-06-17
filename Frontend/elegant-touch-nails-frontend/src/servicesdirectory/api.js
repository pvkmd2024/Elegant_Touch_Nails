import { transformDateField } from "../utils/utils";
const API_URL = "http://localhost:5001/api";
const API_BASE_URL = "http://localhost:5001/api";
export const fetchClients = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/clients");
    const contentType = response.headers.get("content-type");
    console.log("Response Content-Type:", contentType);

    if (!response.ok) {
      const text = await response.text(); 
      console.error("Error response body:", text);
      throw new Error("Failed to fetch clients");
    }

    const data = await response.json();
    console.log("Clients fetched from API:", data); 
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const createClient = async (client) => {
  const response = await fetch("http://localhost:5001/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Failed to create client");
  }

  const data = await response.json();
  return data;
};

// PUT/UPDATE client
export const updateClient = async (id, updatedData) => {
  const response = await fetch(`http://localhost:5001/api/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) throw new Error("Failed to update client");
  return await response.json();
};

// DELETE client
export const deleteClient = async (id) => {
  const response = await fetch(`http://localhost:5001/api/clients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete client");
  return await response.json();
};

// Services API

export async function fetchServices() {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return await response.json();
}

// export async function createService(service) {
//   const formattedService = {
//     serviceName: service.ServiceName,
//     description: service.Description,
//     minDuration: Number(service.MinDuration),
//     maxDuration: Number(service.MaxDuration),
//     minPrice: Number(service.MinPrice),
//     maxPrice: Number(service.MaxPrice),
//   };

//   const response = await fetch(`${API_BASE_URL}/services`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify([formattedService]), 
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to create service");
//   }

//   return await response.json();
// }

// export async function updateService(id, service) {
//   // Convert PascalCase to camelCase for backend consistency
//   const formattedService = {
//     serviceName: service.ServiceName,
//     description: service.Description,
//     minDuration: Number(service.MinDuration),
//     maxDuration: Number(service.MaxDuration),
//     minPrice: Number(service.MinPrice),
//     maxPrice: Number(service.MaxPrice),
//   };

//   const response = await fetch(`${API_BASE_URL}/services/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formattedService),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to update service");
//   }

//   return await response.json();
// }
// servicesdirectory/api.js

export const createService = async (service) => {
  const res = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!res.ok) {
    throw new Error("Failed to create service");
  }

  return await res.json();
};

export const updateService = async (id, service) => {
  const res = await fetch(`/api/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!res.ok) {
    throw new Error("Failed to update service");
  }

  return await res.json();
};

export async function deleteService(id) {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return await response.json();
}

export const fetchPayments = async () => {
  try {
    const response = await fetch(`${API_URL}/payments`);
    const contentType = response.headers.get("content-type");
    console.log("Response Content-Type:", contentType);

    if (!response.ok) {
      const text = await response.text(); // Read error body
      console.error("Error response body:", text);
      throw new Error("Failed to fetch payments");
    }

    const payments = await response.json();
    if (!payments || payments.length === 0) {
      console.warn("No payments data available.");
      return [];  // Return empty array if no data is found
    }

    return transformDateField(payments, "date");
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};


export async function createPayment(payment) {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to create payment");
  }
  return await response.json();
}

export async function updatePayment(id, payment) {
  const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  if (!response.ok) {
    throw new Error("Failed to update payment");
  }
  return await response.json();
}

// Delete a payment by ID
export const deletePayment = async (id) => {
  try {
    const response = await fetch(`${API_URL}/payments/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete payment");

    return await response.json();
  } catch (error) {
    console.error("Error deleting payment:", error);
    return null;
  }
};
// Staff API
export const fetchStaff = async () => {
  const response = await fetch("http://localhost:5001/api/staff");

  const contentType = response.headers.get("content-type");
  console.log("Response Content-Type:", contentType);

  if (!response.ok) {
    const text = await response.text();
    console.error("Error response body:", text);
    throw new Error("Failed to fetch staff");
  }

  const data = await response.json();
  console.log(" Staff fetched from API:", JSON.stringify(data, null, 2)); // Log clearly
  return data;
};

export const createStaff = async (staffData) => {
  // Convert PascalCase to camelCase
  const formattedStaff = {
    FullName: staffData.FullName,
    Role: staffData.Role,
    Email: staffData.Email,
    PasswordHash: staffData.PasswordHash,
  };
console.log("Sending formattedStaff:", [formattedStaff]);

  const response = await fetch("http://localhost:5001/api/staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([formattedStaff]), // backend expects array
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create staff member");
  }

  return await response.json();
};

export const updateStaff = async (id, data) => {
  const res = await fetch(`http://localhost:5001/api/staff/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update staff");
  }
};


export const deleteStaff = async (id) => {
   
  const res = await fetch(`http://localhost:5001/api/staff/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete staff");
  }
};

export const fetchStaffSchedules = async () => {
  const response = await fetch("http://localhost:5001/api/staffschedules");

  const contentType = response.headers.get("content-type");
  console.log("Response Content-Type:", contentType); 
console.log("response.json")
  if (!response.ok) {
    const text = await response.text(); 
    console.error("Error response body:", text);
    throw new Error("Failed to fetch staff schedules");
  }

  return await response.json();
};

export const createStaffSchedule = async (schedule) => {
  const response = await fetch("http://localhost:5001/api/staffSchedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) {
    throw new Error("Failed to create schedule");
  }

  const data = await response.json();  
  return data;                         
};


export const updateStaffSchedule = async (id, updatedData) => {
  const response = await fetch(`http://localhost:5001/api/staffschedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) throw new Error("Failed to update staff schedule");
  return await response.json();
};

export const deleteStaffSchedule = async (id) => {
  const response = await fetch(`http://localhost:5001/api/staffschedules/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete staff schedule");
  return await response.json();
};

// appointmentsApi.js
export const fetchAppointments = async () => {
  const response = await fetch("http://localhost:5001/api/appointments");

  const contentType = response.headers.get("content-type");
  console.log("Response Content-Type:", contentType); 
  console.log("response.json");

  if (!response.ok) {
    const text = await response.text(); 
    console.error("Error response body:", text);
    throw new Error("Failed to fetch appointments");
  }
  return await response.json();
};

export const createAppointment = async (appointment) => {
  const response = await fetch("http://localhost:5001/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  if (!response.ok) {
    const text = await response.text(); 
    console.error("Error response body:", text);
    throw new Error("Failed to create appointment");
  }

  return await response.json();
};

export const updateAppointment = async (id, updatedData) => {
  const response = await fetch(`http://localhost:5001/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const text = await response.text(); 
    console.error("Error response body:", text);
    throw new Error("Failed to update appointment");
  }

  return await response.json();
};

export const deleteAppointment = async (id) => {
  const response = await fetch(`http://localhost:5001/api/appointments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const text = await response.text(); 
    console.error("Error response body:", text);
    throw new Error("Failed to delete appointment");
  }

  return await response.json();
};
