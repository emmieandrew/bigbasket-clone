import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const AddCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardError, setCardError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet!");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { token, error } = await stripe.createToken(cardNumberElement, {
      name,
      address_zip: postalCode,
    });

    if (error) {
      console.error("[Error]", error);
    } else {
      console.log("[Token]", token);
      // Send the token.id to your backend to process payments or save the card
    }
  };

  const inputStyle = {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  };

  const fieldContainerStyle = {
    marginBottom: "15px",
  };

  const errorStyle = {
    color: "#9e2146",
    fontSize: "12px",
    marginTop: "5px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Add Your Card
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name on Card */}
        <div style={fieldContainerStyle}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
            Name on Card
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on card"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Card Number */}
        <div style={fieldContainerStyle}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
            Card Number
          </label>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <CardNumberElement
              options={{ style: inputStyle }}
              onChange={(e) => setCardError(e.error ? e.error.message : null)}
            />
          </div>
          {cardError && <div style={errorStyle}>{cardError}</div>}
        </div>

        {/* Expiration Date */}
        <div style={fieldContainerStyle}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
            Expiration Date
          </label>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <CardExpiryElement
              options={{ style: inputStyle }}
              onChange={(e) => setExpiryError(e.error ? e.error.message : null)}
            />
          </div>
          {expiryError && <div style={errorStyle}>{expiryError}</div>}
        </div>

        {/* CVC */}
        <div style={fieldContainerStyle}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
            CVC
          </label>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <CardCvcElement
              options={{ style: inputStyle }}
              onChange={(e) => setCvcError(e.error ? e.error.message : null)}
            />
          </div>
          {cvcError && <div style={errorStyle}>{cvcError}</div>}
        </div>

        {/* ZIP Code */}
        <div style={fieldContainerStyle}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
            ZIP Code
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="ZIP Code"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={!stripe ? { ...buttonStyle, backgroundColor: "#ccc", cursor: "not-allowed" } : buttonStyle}
          disabled={!stripe}
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
