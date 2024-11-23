import { useSyncCartsMutation } from "@/redux/features/order/orderApi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthCheck from "./use-auth-check";
import { sync_cart_products } from "@/redux/features/cartSlice";

const useSyncCartData = () => {
  const dispatch =useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const [syncCarts] = useSyncCartsMutation();
  const authChecked = useAuthCheck();
  const isFirst = useRef(true);

  const syncCartItemsWithLocalStorage = async () => {
    const response = await syncCarts(cart_products);
    let carts = response?.data?.cart;
  
    // Transforming the cart data to match the expected format
    let updatedCart = carts?.map((item) => {
      return {
        ...item.product,
        id: item.product_id,
        selectedVariant: item.variant,
        orderQuantity: item.qty,
      };
    });
  
    // Only dispatch if it's the first time this function is called
    if (isFirst.current) {
      dispatch(sync_cart_products(updatedCart));
      isFirst.current = false; // Update the ref after the first call
    }
  };
  

  useEffect(() => {
    if (auth.accessToken && auth.user && cart_products) {
      syncCartItemsWithLocalStorage()
    }
  }, [cart_products,authChecked]); // Runs whenever cart_products change
};

export default useSyncCartData;
