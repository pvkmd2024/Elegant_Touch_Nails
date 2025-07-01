import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { accessLevel } = useContext(AuthContext);

  if (!accessLevel || !allowedRoles.includes(accessLevel)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
