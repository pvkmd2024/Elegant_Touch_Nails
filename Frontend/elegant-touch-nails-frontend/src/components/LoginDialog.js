import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginDialog.module.css";

export default function LoginDialog() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", { email, password, role });
      login(res.data); // updates isAuthenticated in context

      // Navigate based on role
      if (res.data.role === "Manager") {
        navigate("/dashboard/manager");
      } else if (res.data.role === "Staff") {
        navigate("/appointments");
      } else {
        navigate("/payments");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unexpected error"));
    }
  };

  return (
    <div className={styles.loginDialog}>
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Client">Client</option>
        <option value="Staff">Staff</option>
        <option value="Manager">Manager</option>
      </select>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
