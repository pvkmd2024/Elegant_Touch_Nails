import React from "react";
import Navigation from "./components/Navigation";
import AppRoutes from "./AppRoutes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  );
};

export default App;
