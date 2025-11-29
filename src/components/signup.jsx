import React, { useState } from "react";
import "./Signup.css";

function Signup({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Signup successful! Please login.");
        setEmail("");
        setPassword("");
      } else {
        setMessage("❌ Email already registered");
      }
    } catch (error) {
      setMessage("❌ Server error. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      {/* Main Title */}
      <h1 className="site-name">🧵 Handloom Hub</h1>

      <div className="signup-card">
        <h2>Signup</h2>

        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>

        {/* Message */}
        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="toggle-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
