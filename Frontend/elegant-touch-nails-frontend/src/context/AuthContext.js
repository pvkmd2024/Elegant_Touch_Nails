// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    token: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔐 Load Auth State from Storage on First Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && role && user) {
      setAuthState({
        isAuthenticated: true,
        token,
        role,
        user,
      });
    } else {
      logout(); // Clear junk if partial state
    }

    setLoading(false);
  }, []);

  // 🚪 Logout Helper
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,
    });
  };

  // Utility to normalize accessLevel and role to one of: 'Manager', 'Staff', 'Client'
const normalizeRole = (accessLevel, role) => {
  if (accessLevel === "Client") return "Client";
  if (accessLevel === "Staff") {
    if (role === "Manager") return "Manager"; // promote Manager
    return "Staff"; // All other roles: Nail technician, Receptionist, etc.
  }
  return null; // fallback
};

  const login = async (email, password, selectedRole) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password, role: selectedRole });
    const { token, user } = res.data;

    // Normalize using accessLevel and role
    const normalizedRole = normalizeRole(user?.AccessLevel, user?.Role);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", normalizedRole);

    setAuthState({
      isAuthenticated: true,
      token,
      user,
      role: normalizedRole,
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

  return (
    <AuthContext.Provider value={{ authState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
