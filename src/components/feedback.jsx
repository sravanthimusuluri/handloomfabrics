import React, { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
    }
  };

  return (
    <div className="feedback-container">
      <h2>We value your feedback 💬</h2>

      {submitted ? (
        <p className="thank-you">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
