import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Feedback from "./components/feedback";
import CameraCapture from "./components/cameracapture";
import Address from "./components/Addresspage";
import "./App.css";

/* ------------------ MODAL COMPONENT ------------------ */
function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          <img src={product.img} alt={product.name} className="modal-image" />

          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-price">Price: ₹{product.price}</p>

            <p className="modal-desc">
              {product.description ||
                "This is a premium handloom product made from natural fibers."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ------------------------------------------------------ */

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("signup");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ------------------ PRODUCTS ------------------ */
  const products = [
    { id: 1, name: "Maheshwari Silk Saree", price: 1200, img: "cotton.png" },
    { id: 2, name: "Ikat dress", price: 950, img: "Ikat dress.png" },
    { id: 3, name: "Handloom cotton shirt", price: 2200, img: "Shirt.png" },
    { id: 4, name: "Handwoven Dhoti", price: 850, img: "Threads.png" },
    { id: 5, name: "Ikat Dress Material", price: 1500, img: "Threads.png" },
    { id: 6, name: "Kalamkari Ikat Fabric", price: 700, img: "Ikat dress.png" },
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  /* ------------------ AUTH ------------------ */
  const handleSignup = (email, password) => {
    if (users.find(u => u.email === email)) return false;

    setUsers([...users, { email, password }]);
    setPage("login");
    return true;
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
      setPage("dashboard");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage("login");
    setFilteredProducts(products);
  };

  /* ------------------ SEARCH ------------------ */
  const handleSearch = (term) => {
    setSearch(term);
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  /* ------------------ CAMERA AI FILTER ------------------ */
  const handleClassify = (predictions) => {
    const labels = predictions.map(p => p.className.toLowerCase());

    const matches = products.filter(p =>
      labels.some(label => p.name.toLowerCase().includes(label.split(",")[0]))
    );

    setFilteredProducts(matches.length ? matches : products);
    setPage("dashboard");
  };

  /* ------------------ CART ------------------ */
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));

  const displayedProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ------------------ LOGIN / SIGNUP ------------------ */
  if (!currentUser) {
    return (
      <>
        {page === "signup" ? (
          <div className="card">
            <h2>Signup</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const success = handleSignup(email, password);
                if (!success) alert("Email already registered!");
              }}
            >
              <input type="email" name="email" placeholder="Enter your email" required />
              <input type="password" name="password" placeholder="Enter your password" required />
              <button type="submit">Signup</button>
            </form>
            <p onClick={() => setPage("login")}>Already have an account? Login</p>
          </div>
        ) : (
          <div className="card">
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const success = handleLogin(email, password);
                if (!success) alert("Invalid email or password!");
              }}
            >
              <input type="email" name="email" placeholder="Enter your email" required />
              <input type="password" name="password" placeholder="Enter your password" required />
              <button type="submit">Login</button>
            </form>
            <p onClick={() => setPage("signup")}>Don't have an account? Signup</p>
          </div>
        )}
      </>
    );
  }

  /* ------------------ MAIN APP ------------------ */
  return (
    <div>
      <Header
        currentUser={currentUser}
        setPage={setPage}
        handleLogout={handleLogout}
        cartCount={cart.length}
        search={search}
        setSearch={handleSearch}
      />

      {/* Dashboard Page */}
      {page === "dashboard" && (
        <>
          <Dashboard currentUser={currentUser} setPage={setPage} />

          <div style={{ textAlign: "center", margin: "20px" }}>
            <button
              onClick={() => setPage("camera")}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Use Camera
            </button>
          </div>

          <div className="product-grid">
            {displayedProducts.map((p) => (
              <div key={p.id} onClick={() => setSelectedProduct(p)}>
                <ProductCard product={p} addToCart={addToCart} />
              </div>
            ))}
          </div>

          <Cart cart={cart} removeFromCart={removeFromCart} />
        </>
      )}

      {/* Feedback Page */}
      {page === "feedback" && <Feedback />}

      {/* Camera Page */}
      {page === "camera" && <CameraCapture onClassify={handleClassify} />}

      {/* Address Page */}
      {page === "address" && (
        <Address
          currentUser={currentUser}
        />
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
