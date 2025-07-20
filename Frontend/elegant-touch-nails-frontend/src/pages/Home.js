import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      if (authState.role === "Manager") navigate("/manager");
      else if (authState.role === "Staff") navigate("/staff");
      else if (authState.role === "Client") navigate("/client");
    }
  }, [authState, navigate]);
console.log("Home rendering");
  return (
    <div>
      <h2>Welcome to Elegant Touch Nails</h2>
      <p>Please log in to continue.</p>
    </div>
  );
};

export default Home;