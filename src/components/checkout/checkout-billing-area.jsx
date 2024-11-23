import apiInstance from "@/utils/api";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CheckoutBillingArea = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch addresses from the API
  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiInstance.get("/address");
      setAddresses(response.data);
    } catch (err) {
      setError("Failed to fetch addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiInstance.post("/address", data);
      const newAddress = response.data;

      // Update the address list
      fetchAddresses();

      // Hide the form and reset fields
      setShowAddAddressForm(false);
      reset();
    } catch (err) {
      setError("Failed to add address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      {/* Address List */}
      <div className="tp-checkout-bill-inner">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && addresses.length > 0
          ? addresses.map((address) => (
              <div
                key={address.id}
                className={`address-card ${selectedAddressId === address.id ? "selected" : ""}`}
                onClick={() => setSelectedAddressId(address.id)}
              >
                <input
                  type="radio"
                  name="selected_address"
                  checked={selectedAddressId === address.id}
                  onChange={() => setSelectedAddressId(address.id)}
                />
                <div>
                  <strong>{address.address_label}</strong>
                  <p>{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>{address.landmark}, {address.zipcode}</p>
                </div>
              </div>
            ))
          : !loading && (
              <p>No addresses available. Please add a new one below.</p>
            )}
      </div>

      {/* Add New Address Button */}
      {!showAddAddressForm && !loading && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowAddAddressForm(true)}
        >
          Add New Address
        </button>
      )}

      {/* Add New Address Form */}
      {showAddAddressForm && (
        <div className="tp-checkout-add-address-form">
          <h4>Add New Address</h4>
          <div className="tp-checkout-input">
            <label>
              Address Label <span>*</span>
            </label>
            <input
              type="text"
              {...register("address_label", {
                required: "Address label is required",
              })}
              placeholder="e.g., Home, Office"
            />
            {errors.address_label && (
              <p className="error">{errors.address_label.message}</p>
            )}
          </div>
          <div className="tp-checkout-input">
            <label>
              Address Line 1 <span>*</span>
            </label>
            <input
              type="text"
              {...register("address_line1", {
                required: "Address Line 1 is required",
              })}
              placeholder="House number, Street"
            />
            {errors.address_line1 && (
              <p className="error">{errors.address_line1.message}</p>
            )}
          </div>
          <div className="tp-checkout-input">
            <label>Address Line 2</label>
            <input
              type="text"
              {...register("address_line2")}
              placeholder="Apartment, Suite"
            />
          </div>
          <div className="tp-checkout-input">
            <label>
              Landmark <span>*</span>
            </label>
            <input
              type="text"
              {...register("landmark", {
                required: "Landmark is required",
              })}
              placeholder="Near Park, Mall, etc."
            />
            {errors.landmark && (
              <p className="error">{errors.landmark.message}</p>
            )}
          </div>
          <div className="tp-checkout-input">
            <label>
              ZIP Code <span>*</span>
            </label>
            <input
              type="text"
              {...register("zipcode", {
                required: "ZIP Code is required",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message: "Enter a valid ZIP code",
                },
              })}
              placeholder="123456"
            />
            {errors.zipcode && (
              <p className="error">{errors.zipcode.message}</p>
            )}
          </div>
          <button
            onClick={handleSubmit(handleAddAddress)}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowAddAddressForm(false);
              reset(); // Reset form on cancel
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutBillingArea;
