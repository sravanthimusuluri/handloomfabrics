import React, { useState } from "react";
import "./Gallery.css";

const images = [
  {
    id: 1,
    src: "/images/cotton.jpg",
    title: "Cotton Dress",
    description: "A soft and breathable cotton dress perfect for summer."
  },
  {
    id: 2,
    src: "/images/silk.jpg",
    title: "Silk Saree",
    description: "Premium silk with handwoven design."
  },
  {
    id: 3,
    src: "/images/wool.jpg",
    title: "Wool Shawl",
    description: "Warm woolen shawl made from traditional handloom."
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-container">
      <h2>Product Gallery</h2>

      <div className="image-grid">
        {images.map(img => (
          <div
            key={img.id}
            className="image-card"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.src} alt={img.title} />
            <p>{img.title}</p>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedImage && (
        <div className="popup-overlay" onClick={() => setSelectedImage(null)}>
          <div className="popup-box" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt="popup" />
            <h3>{selectedImage.title}</h3>
            <p>{selectedImage.description}</p>
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
