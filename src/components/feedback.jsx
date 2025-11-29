import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Feedback.css";

function Feedback() {
  const [email, setEmail] = useState("");       // Customer email
  const [message, setMessage] = useState("");   // Feedback message

  const sendFeedback = (e) => {
    e.preventDefault();

    // Template parameters for EmailJS
    const templateParams = {
      customer_email: email,                   // Customer email from form
      feedback_message: message,               // Feedback message from form
      site_owner_email: "2400030661@kluniversity.in", // Your site owner email
      subject: "Thank you for your feedback!",  // Optional: subject
    };

    emailjs.send(
      "service_3kyip88",       // Your EmailJS Service ID
      "template_xvg7jqs",      // Your EmailJS Template ID
      templateParams,
      "m0Z05ac1qU-1sy3zx"     // Your Public Key
    )
    .then((response) => {
      alert("Feedback sent successfully!");
      setEmail("");
      setMessage("");
    })
    .catch((err) => {
      console.error("Error sending feedback:", err);
      alert("Failed to send feedback. Please try again.");
    });
  };

  return (
    <div className="feedback-container">
      <h2>Give Your Feedback</h2>
      <form onSubmit={sendFeedback} className="feedback-form">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
