import React, { useState, useContext } from "react";
import LoginDialog from "../components/LoginDialog";
import { AuthContext } from "../context/AuthContext";

const LoginLandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      {!isAuthenticated ? (
        <>
          <h2 style={styles.subheading}>Welcome to Elegant Touch Nails</h2>
          {!showLogin ? (
            <>
              <p>Please login to access the system</p>
              <button style={styles.button} onClick={() => setShowLogin(true)}>
                Login
              </button>
            </>
          ) : (
            <LoginDialog />
          )}
        </>
      ) : (
        <p style={{ marginTop: "20px", color: "green" }}>
          You are already logged in.
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px",
  },
  subheading: {
    fontSize: "20px",
    marginBottom: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LoginLandingPage;
