import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {authState } = useContext(AuthContext);

  if (!authState.isAuthenticated || !authState.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(authState.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

// src/routes/ProtectedRoute.js
// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { role } = useContext(AuthContext);

//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// export default ProtectedRoute;
// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { role } = useContext(AuthContext);

//   if (!role || !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
