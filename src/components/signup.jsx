import React, { useState } from "react";

function Signup({ onSignup, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill all fields.");
      return;
    }
    const success = onSignup(email, password);
    if (success) {
      setMessage("Signup successful! Please login.");
      setEmail("");
      setPassword("");
    } else {
      setMessage("Email already registered.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p onClick={switchToLogin} className="toggle-link">Already have an account? Login</p>
    </div>
  );
}

export default Signup;
