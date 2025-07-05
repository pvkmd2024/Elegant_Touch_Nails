import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      {/* <h1>Elegant Touch Nails</h1> */}
      <p>Welcome to Elegant Touch Nails</p>
      <p>Please click login to access the system.</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Home;