import React from "react";
import Navigation from "components/Navigation";
import AppRoutes from "AppRoutes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
