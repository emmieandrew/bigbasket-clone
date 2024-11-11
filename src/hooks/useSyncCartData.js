import { useSyncCartsMutation } from "@/redux/features/order/orderApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuthCheck from "./use-auth-check";

const useSyncCartData = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const [syncCarts] = useSyncCartsMutation();
  const authChecked = useAuthCheck();


  useEffect(() => {
    if (authChecked && cart_products && cart_products.length > 0) {
      syncCarts(cart_products);
    }
  }, [cart_products, syncCarts]); // Runs whenever cart_products change
};

export default useSyncCartData;
