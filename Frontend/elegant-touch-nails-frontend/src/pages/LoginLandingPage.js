// src/pages/LoginLandingPage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import LoginDialog from "../components/LoginDialog"; // Only needed if you're using a popup dialog

const LoginLandingPage = () => {
  const { login, authState } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authState.isAuthenticated) {
      if (authState.role === "Manager") navigate("/manager");
      else if (authState.role === "Staff") navigate("/staff");
      else if (authState.role === "Client") navigate("/client");
    }
  }, [authState, navigate]);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
    // Simulate backend login
    const response = {
      success: true,
      user: { email },
      role: email === "john2520@eleganttouch.com" ? "Manager"
        : email.includes("staff") ? "Staff"
          : "Client",
      token: "mock-token",
    };

    if (response.success) {
      login({
        user: response.user,
        role: response.role,
        token: response.token,
      });

      // ✅ Redirect to appropriate dashboard
      if (response.role === "Manager") {
        navigate("/manager-dashboard");
      } else if (response.role === "Staff") {
        navigate("/staff-dashboard");
      } else if (response.role === "Client") {
        navigate("/client-dashboard");
      } else if (response.role === "Unauthorized") {
        navigate("/unauthorized");
      }
    }
  };

  return (
    <div style={styles.container}>
      {!authState.isAuthenticated ? (
        <>
          <h2 style={styles.subheading}>Welcome to Elegant Touch Nails</h2>
          {!showLoginForm ? (
            <>
              <p>Please login to access the system</p>
              <button style={styles.button} onClick={() => setShowLoginForm(true)}>
                Login
              </button>
            </>
          ) : (
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleLogin} style={styles.button}>
                Submit
              </button>
            </div>
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
  form: {
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    margin: "5px",
    fontSize: "16px",
    width: "250px",
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