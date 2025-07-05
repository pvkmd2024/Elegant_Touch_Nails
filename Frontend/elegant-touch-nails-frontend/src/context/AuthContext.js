import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [accessLevel, setAccessLevel] = useState(null);
  const [user, setUser] = useState(null);

const isAuthenticated = !!user;

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
    localStorage.setItem("accessLevel", data.accessLevel); 
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setRole(data.role);
    setAccessLevel(data.accessLevel); 
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setAccessLevel(null); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, accessLevel, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
// src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null); // or { token: null, role: null }

//    // Load from localStorage on app start
//   useEffect(() => {
//     const storedAuth = localStorage.getItem("auth");
//     if (storedAuth) {
//       setAuth(JSON.parse(storedAuth));
//     }
//   }, []);

// const login = (data) => {
//   const authData = {
//     token: data.token,
//     role: data.role,
//     accessLevel: data.accessLevel,
//     user: data.user,
//   };

//   setAuth(authData);
//   localStorage.setItem("auth", JSON.stringify(authData)); // persist on reload
// };

//   const logout = () => {
//     setAuth(null); // Clear all auth info
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [role, setRole] = useState(null);
//   const [accessLevel, setAccessLevel] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     const storedAccessLevel = localStorage.getItem("accessLevel");
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedRole) setRole(storedRole);
//     if (storedAccessLevel) setAccessLevel(storedAccessLevel);
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const login = (data) => {
//     localStorage.setItem("role", data.role);
//     localStorage.setItem("accessLevel", data.accessLevel); // 🔥 NEW
//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("token", data.token);

//     setRole(data.role);
//     setAccessLevel(data.accessLevel); 
//     setUser(data.user);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setRole(null);
//     setAccessLevel(null); 
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ role, accessLevel, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
