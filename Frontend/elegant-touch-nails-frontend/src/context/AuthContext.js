// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    // accessLevel: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRole = localStorage.getItem("role");
    // const storedAccessLevel = localStorage.getItem("accessLevel");

    if (storedUser && storedRole) { //deleted && storedAccessLevel
      setAuthState({
        isAuthenticated: true,
        user: storedUser,
        role: storedRole,
        // accessLevel: storedAccessLevel,
      });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.role);
    // localStorage.setItem("accessLevel", data.accessLevel);
    localStorage.setItem("token", data.token);

    setAuthState({
      isAuthenticated: true,
      user: data.user,
      role: data.role,
      // accessLevel: data.accessLevel,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null,
      // accessLevel: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
