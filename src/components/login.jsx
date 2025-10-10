import React, { useState } from "react";

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) setMessage("Invalid email or password");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p onClick={switchToSignup} className="toggle-link">Don't have an account? Signup</p>
    </div>
  );
}

export default Login;
