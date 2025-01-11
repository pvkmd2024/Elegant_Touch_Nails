import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Clients API
export const fetchClients = () => axios.get(`${API_URL}/clients`);
export const createClient = (data) => axios.post(`${API_URL}/clients`, data);

// Services API
export const fetchServices = () => axios.get(`${API_URL}/services`);
export const createService = (data) => axios.post(`${API_URL}/services`, data);

// Payments API
export const fetchPayments = () => axios.get(`${API_URL}/payments`);
export const createPayment = (data) => axios.post(`${API_URL}/payments`, data);

// Staff API
export const fetchStaff = () => axios.get(`${API_URL}/staff`);
export const createStaff = (data) => axios.post(`${API_URL}/staff`, data);

// Staff Schedule API
export const fetchStaffSchedules = () =>
  axios.get(`${API_URL}/staff-schedules`);
export const createStaffSchedule = (data) =>
  axios.post(`${API_URL}/staff-schedules`, data);

// Appointments API
export const fetchAppointments = () => axios.get(`${API_URL}/appointments`);
export const createAppointment = (data) =>
  axios.post(`${API_URL}/appointments`, data);
