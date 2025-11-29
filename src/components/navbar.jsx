import React from "react";
import "./Navbar.css";
import Address from "./Address";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
        <img
          src="/logo.png"
          alt="logo"
          className="logo"
        />
        <h2 className="title">Handloom Haven</h2>
      </div>

      <input
        type="text"
        placeholder="Search for fabrics..."
        className="search-box"
      />

      <div className="right-section">
        <button className="feedback-btn">Feedback</button>
        <button className="logout-btn">Logout</button>

        {/* Address Button */}
        <Address onClick={() => console.log("Address Clicked")} />
      </div>
    </nav>
  );
}

export default Navbar;
