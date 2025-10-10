import React from "react";
import "./Header.css";

function Header({ currentUser, setPage, handleLogout, cartCount, search, setSearch }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={() => setPage("dashboard")}>🧵 Handloom Haven</h1>
      {currentUser && (
        <input
          type="text"
          className="search-box"
          placeholder="Search for fabrics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <nav>
        {currentUser ? (
          <>
            <button onClick={() => setPage("feedback")}>Feedback</button>
            <button onClick={handleLogout}>Logout</button>
            <div className="cart">🛒 {cartCount}</div>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("signup")}>Signup</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
