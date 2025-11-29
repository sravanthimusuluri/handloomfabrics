import React, { useState } from "react";
import "./Login.css"; // optional styling file

function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user)); // store user
      } else {
        setMessage("❌ Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* App Title */}
      <h1 className="site-name">🧵 Handloom Hub</h1>

      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="login-form">
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

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          Don't have an account?{" "}
          <span onClick={switchToSignup} className="toggle-link">
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
