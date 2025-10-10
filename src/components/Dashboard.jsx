import React from "react";
import "./Dashboard.css";

function Dashboard({ currentUser }) {
  return (
    <div className="dashboard">
      <h2>Welcome, {currentUser.email} 👋</h2>
      <p>Explore our latest handloom fabrics crafted with tradition and love.</p>
    </div>
  );
}

export default Dashboard;
