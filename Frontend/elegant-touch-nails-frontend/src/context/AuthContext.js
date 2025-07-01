import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [accessLevel, setAccessLevel] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedAccessLevel = localStorage.getItem("accessLevel");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedRole) setRole(storedRole);
    if (storedAccessLevel) setAccessLevel(storedAccessLevel);
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (data) => {
    localStorage.setItem("role", data.role);
    localStorage.setItem("accessLevel", data.accessLevel); // 🔥 NEW
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setRole(data.role);
    setAccessLevel(data.accessLevel); // 🔥 NEW
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setAccessLevel(null); // 🔥 NEW
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, accessLevel, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
