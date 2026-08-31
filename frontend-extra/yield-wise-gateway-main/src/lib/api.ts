// src/lib/api.ts
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api"; // tumhara FastAPI backend base URL

// -------------------- AUTH --------------------

// Login function: returns { token, user }
export const login = async (userType: "farmer" | "expert" | "admin", email: string, password: string) => {
  const res = await axios.post(`${API_BASE}/login/${userType}`, { email, password });
  return res.data; // { token, user }
};

// Register function
export const register = async (userType: "farmer" | "expert" | "admin", userData: any) => {
  const res = await axios.post(`${API_BASE}/register/`, userData);
  return res.data;
};

// -------------------- FARMERS --------------------

// Get current logged-in farmer
export const getCurrentFarmer = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/farmers/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all farmers
export const getAllFarmers = async () => {
  const res = await axios.get(`${API_BASE}/farmers/`);
  return res.data;
};

// -------------------- CROPS --------------------

// Get all crops
export const getCrops = async () => {
  const res = await axios.get(`${API_BASE}/crops/`);
  return res.data;
};

// Get single crop by id
export const getCropById = async (cropId: number) => {
  const res = await axios.get(`${API_BASE}/crops/${cropId}`);
  return res.data;
};

// Create new crop
export const createCrop = async (cropData: any) => {
  const res = await axios.post(`${API_BASE}/crops/`, cropData);
  return res.data;
};

// -------------------- CROP PRODUCTION / MATRIX --------------------

// Fetch crop production records
export const getCropRecords = async (year: string = "2024", state: string = "all") => {
  const res = await axios.get(`${API_BASE}/crop-records`, {
    params: { year, state },
  });
  return res.data;
};

// Create production data for a crop
export const createCropProduction = async (cropId: number, data: any) => {
  const res = await axios.post(`${API_BASE}/crops/${cropId}`, data);
  return res.data;
};

// Get all production data
export const getAllProductionData = async () => {
  const res = await axios.get(`${API_BASE}/production-data/`);
  return res.data;
};

// -------------------- EXPERTS --------------------

// Get all experts
export const getExperts = async () => {
  const res = await axios.get(`${API_BASE}/experts/`);
  return res.data;
};

// Create new expert
export const createExpert = async (expertData: any) => {
  const res = await axios.post(`${API_BASE}/experts/`, expertData);
  return res.data;
};

// -------------------- SCHEMES --------------------

// Get all schemes
export const getSchemes = async (state?: string) => {
  const res = await axios.get(`${API_BASE}/schemes/`, { params: { state } });
  return res.data;
};

// Create new scheme
export const createScheme = async (schemeData: any) => {
  const res = await axios.post(`${API_BASE}/schemes/`, schemeData);
  return res.data;
};

// -------------------- PAYMENTS (if applicable) --------------------

// Example: fetch payments for farmer
export const getPayments = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/payments/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
