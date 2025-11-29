import React from "react";
import "./ImagePopup.css";

function ImagePopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.name} className="popup-image" />
        <h2>{item.name}</h2>
        <p><strong>Price:</strong> ₹{item.price}</p>
        <p><strong>Details:</strong> {item.details}</p>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ImagePopup;
