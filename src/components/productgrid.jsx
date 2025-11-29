import React, { useState } from "react";
import ImageModal from "./ImageModal";
import "./product-grid.css";

function ProductGrid({ products, onAddToCart }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid-wrap">
      <div className="grid-title">Products</div>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card" onClick={() => setSelected(p)}>
            <div className="thumb">
              <img
                src={p.img}
                alt={p.name}
                onError={(e) => (e.target.src = "/images/fallback.png")}
              />
            </div>
            <div className="card-body">
              <div className="name">{p.name}</div>
              <div className="price">₹{p.price}</div>
            </div>
            <button
              className="add-cart"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(p);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && <ImageModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default ProductGrid;
