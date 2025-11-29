import React from "react";
import "./product-grid.css";

function ImageModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-content">
          <img
            src={product.img}
            alt={product.name}
            className="modal-image"
            onError={(e) => { e.target.src = "/images/fallback.png"; }}
          />
          <div className="modal-details">
            <h3 className="modal-title">{product.name}</h3>
            <p className="modal-price">Price: ₹{product.price}</p>
            <p className="modal-desc">{product.description ?? "No description available."}</p>

            {/* optional actions */}
            {product.details && (
              <div className="modal-extra">
                <strong>Details:</strong>
                <p>{product.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
