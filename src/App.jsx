import React, { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Feedback from "./components/Feedback";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("signup"); // signup, login, dashboard, feedback
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Maheshwari Silk Saree", price: 1200, img: "/cotton.png" },
    { id: 2, name: "Banarasi Cotton Saree", price: 950, img: "/Ikat dress.png" },
    { id: 3, name: "Kanchipuram Silk Saree", price: 2200, img: "/Shirt.png" },
    { id: 4, name: "Handwoven Dhoti", price: 850, img: "/Threads.png" },
    { id: 5, name: "Ikat Dress Material", price: 1500, img: "/Threads.png" },
    { id: 6, name: "Kalamkari Cotton Fabric", price: 700, img: "/Ikat dress.png" },
  ];

  // Signup
  const handleSignup = (email, password) => {
    if (users.find((u) => u.email === email)) return false;
    setUsers([...users, { email, password }]);
    setPage("login");
    return true;
  };

  // Login
  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
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
  };

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!currentUser) {
    return (
      <>
        {page === "signup" ? (
          <div className="card" style={{ maxWidth: "500px", padding: "40px 30px", margin: "50px auto" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Signup</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const success = handleSignup(email, password);
                if (!success) alert("Email already registered!");
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                style={{
                  width: "90%",
                  padding: "16px 18px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                style={{
                  width: "90%",
                  padding: "16px 18px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "95%",
                  padding: "20px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  backgroundColor: "#8b0000",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Signup
              </button>
            </form>
            <p
              onClick={() => setPage("login")}
              style={{ marginTop: "20px", cursor: "pointer", color: "#333", fontWeight: "500" }}
            >
              Already have an account? Login
            </p>
          </div>
        ) : (
          <div className="card" style={{ maxWidth: "500px", padding: "40px 30px", margin: "50px auto" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const success = handleLogin(email, password);
                if (!success) alert("Invalid email or password!");
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                style={{
                  width: "90%",
                  padding: "16px 18px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                style={{
                  width: "90%",
                  padding: "16px 18px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "95%",
                  padding: "20px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  backgroundColor: "#8b0000",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </form>
            <p
              onClick={() => setPage("signup")}
              style={{ marginTop: "20px", cursor: "pointer", color: "#333", fontWeight: "500" }}
            >
              Don't have an account? Signup
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <Header
        currentUser={currentUser}
        setPage={setPage}
        handleLogout={handleLogout}
        cartCount={cart.length}
        search={search}
        setSearch={setSearch}
      />

      {page === "dashboard" && (
        <>
          <Dashboard currentUser={currentUser} />
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </>
      )}

      {page === "feedback" && <Feedback />}
    </div>
  );
}

export default App;
