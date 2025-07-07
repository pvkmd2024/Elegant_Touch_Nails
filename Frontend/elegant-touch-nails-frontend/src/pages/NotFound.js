import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate("/login")} style={styles.button}>Go to Login</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10%",
  },
  title: {
    fontSize: "3rem",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    color: "#777",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
