// pages/add-card.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddCard from '@/components/checkout/add-card';

// Load your Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const AddCardPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <AddCard />
      </div>
    </Elements>
  );
};

export default AddCardPage;
