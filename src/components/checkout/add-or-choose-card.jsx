import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import apiInstance from "@/utils/api";

const AddOrChooseCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cardError, setCardError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  // Fetch all saved cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await apiInstance.get("/card");
        setCards(response.data);
        console.log("Fetched cards: ", response.data);
      } catch (err) {
        console.error("Failed to fetch cards", err);
        setError("Failed to fetch cards. Please try again.");
      }
    };
    fetchCards();
  }, []);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet!");
      return;
    }

    setLoading(true);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      const { token, error } = await stripe.createToken(cardNumberElement, {
        name,
        address_zip: postalCode,
      });

      if (error) {
        console.error("[Error]", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      // Send token to backend
      console.log('token: ', token);
      const response = await apiInstance.post("/card", {
        token: token.id,
      });

      if (response.data.success) {
        setCards((prevCards) => [...prevCards, response.data.card]);
        setName("");
        setPostalCode("");
        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
      } else {
        setError("Failed to save card. Try again.");
      }
    } catch (err) {
      console.error("Failed to add card", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
    console.log("Selected card ID:", cardId);
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

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <p style={{ marginTop: "30px" }}>Choose a Card</p>
      <ul>
        {cards.map((card) => (
          <li
            key={card.id}
            onClick={() => handleCardSelect(card.id)}
            style={{
              padding: "15px",
              margin: "10px 0",
              border:
                selectedCard === card.id ? "2px solid blue" : "1px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: selectedCard === card.id ? "#f0f8ff" : "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{card.card.display_brand} Card</strong>
              <br />
              <small>**** **** **** {card.card.last4}</small>
              <br />
              <span>
                Expires {card.card.exp_month}/{card.card.exp_year}
              </span>
              <br />
              <small>
                Postal Code: {card.billing_details.address.postal_code}
              </small>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>Status: </strong>
              {card.card.checks.address_postal_code_check === "pass" ? (
                <span style={{ color: "green" }}>Verified</span>
              ) : (
                <span style={{ color: "red" }}>Unverified</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/*  */}

      <h2>Add a New Card</h2>
      <div>
        <div style={{ marginBottom: "15px" }}>
          <label>Name on Card</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on card"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Card Number</label>
          <CardNumberElement
            options={{ style: inputStyle }}
            onChange={(e) => setCardError(e.error ? e.error.message : null)}
          />
          {cardError && <span style={{ color: "red" }}>{cardError}</span>}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Expiration Date</label>
          <CardExpiryElement
            options={{ style: inputStyle }}
            onChange={(e) => setExpiryError(e.error ? e.error.message : null)}
          />
          {expiryError && <span style={{ color: "red" }}>{expiryError}</span>}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>CVC</label>
          <CardCvcElement
            options={{ style: inputStyle }}
            onChange={(e) => setCvcError(e.error ? e.error.message : null)}
          />
          {cvcError && <span style={{ color: "red" }}>{cvcError}</span>}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>ZIP Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="ZIP Code"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding Card..." : "Add Card"}
        </button>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default AddOrChooseCard;
