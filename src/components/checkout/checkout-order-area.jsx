import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import AddOrChooseCard from "./add-or-choose-card";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import apiInstance from "@/utils/api";
import { useRouter } from "next/navigation";
import { sync_cart_products } from "@/redux/features/cartSlice";

const CheckoutOrderArea = ({ checkoutData, selectedAddressId }) => {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader state

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  const {
    handleShippingCost,
    cartTotal = 0,
    shippingCost,
    discountAmount,
    showCard,
    setShowCard,
  } = checkoutData;

  const { register, errors } = useForm();

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("📍 Please select an address.");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error("💳 Please select a payment method.");
      return;
    }
    if (selectedPaymentMethod === "Card" && !selectedCard) {
      toast.error("💳 Please select a saved card.");
      return;
    }

    const orderData = {
      tip_amount: 0,
      address_id: selectedAddressId,
      shipping_cost: shippingCost,
      discount: discountAmount,
    };

    if (selectedPaymentMethod === "Card") {
      orderData.card_id = selectedCard;
      orderData.payment_mode = "online";
    } else if (selectedPaymentMethod === "COD") {
      orderData.payment_mode = "cod";
    }

    try {
      setIsSubmitting(true); // Start loader
      const response = await apiInstance.post("/order", orderData);
      dispatch(sync_cart_products([]));
      toast.success("🎉 Order placed successfully!");
      navigation.push("/");
    } catch (error) {
      toast.error(
        `🚨 Error placing order: ${
          error.response?.data?.message || "Something went wrong."
        }`
      );
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.name} <span> x {item.orderQuantity}</span>
              </p>
              <span>${item.selectedVariant.sell_price.toFixed(2)}</span>
            </li>
          ))}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>${total?.toFixed(2)}</span>
          </li>
          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>${shippingCost.toFixed(2)}</span>
          </li>
          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>${discountAmount.toFixed(2)}</span>
          </li>
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>${parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            type="radio"
            id="credit_card"
            name="payment"
            value="Card"
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setShowCard(true);
            }}
          />
          <label htmlFor="credit_card">Credit Card</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setShowCard(false);
            }}
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      {showCard && (
        <AddOrChooseCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )}

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          className="tp-checkout-btn w-100"
          onClick={handlePlaceOrder}
          disabled={isSubmitting} // Disable button during submission
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
