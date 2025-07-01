import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginDialog() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", { email, password, role });
      login(res.data); // update context
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + err.response?.data?.message || "Unexpected error");
    }
  };

  return (
    <div className="login-dialog">
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Client">Client</option>
        <option value="Staff">Staff</option>
        <option value="Manager">Salon Manager</option>
      </select>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
