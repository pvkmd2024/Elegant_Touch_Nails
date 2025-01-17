const API_URL = "http://localhost:5000/api";

// Clients API
export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) throw new Error("Failed to fetch clients");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return []; // Return an empty array in case of an error
  }
};

export const createClient = async (data) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const createService = async (data) => {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create service");
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    return null;
  }
};

// Payments API
export const fetchPayments = async () => {
  try {
    const response = await fetch(`${API_URL}/payments`);
    if (!response.ok) throw new Error("Failed to fetch payments");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

export const createPayment = async (data) => {
  try {
    const response = await fetch(`${API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
};

export const createStaff = async (data) => {
  try {
    const response = await fetch(`${API_URL}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching staff schedules:", error);
    return [];
  }
};

export const createStaffSchedule = async (data) => {
  try {
    const response = await fetch(`${API_URL}/staff-schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create staff schedule");
    return await response.json();
  } catch (error) {
    console.error("Error creating staff schedule:", error);
    return null;
  }
};

// Appointments API
export const fetchAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/appointments`);
    if (!response.ok) throw new Error("Failed to fetch appointments");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create appointment");
    return await response.json();
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
};
