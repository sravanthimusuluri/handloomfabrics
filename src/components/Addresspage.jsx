import React, { useState } from "react";
import "./Addresspage.css";

function Address() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your address has been saved successfully!");
  };

  return (
    <div className="address-container">
      <h2 className="address-title">Shipping Address</h2>

      <form className="address-form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="House No / Flat No"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Street / Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <button type="submit" className="address-btn">
          Save Address
        </button>
      </form>
    </div>
  );
}

export default Address;
