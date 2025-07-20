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
