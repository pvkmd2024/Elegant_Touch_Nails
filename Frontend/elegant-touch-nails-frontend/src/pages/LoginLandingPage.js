// src/pages/LoginLandingPage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginLandingPage.css";

const LoginLandingPage = () => {
  const { login, logout, authState } = useContext(AuthContext); // ⬅ include logout
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");

  useEffect(() => {
  console.log("authState", authState);
  if (authState.isAuthenticated) {
    switch(authState.role) {
      case "Manager":
        navigate("/managers-dashboard");
        break;
      case "Staff":
        navigate("/staff-dashboard");
        break;
      case "Client":
        navigate("/clients-dashboard");
        break;
      default:
        console.warn("Unknown role:", authState.role);
        logout();
        break;
    }
  }
}, [authState, navigate, logout]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password || !role) return alert("Please fill out all fields.");

  await logout(); // clear old session before logging in
  const result = await login(email, password, role);
  if (!result.success) alert(result.message);
};

  return (
    <div className="login-container">
      {!authState.isAuthenticated ? (
        <>
          <h2>Login to Elegant Touch Nails</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Role:
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Client">Client</option>
              </select>
            </label>

            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <p className="login-success">You are already logged in.</p>
      )}
    </div>
  );
};

export default LoginLandingPage;
