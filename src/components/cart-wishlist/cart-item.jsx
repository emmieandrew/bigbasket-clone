import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";
export const imageUrl =
  "https://cdn.zeptonow.com/production///tr:w-1000,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/b92ec79e-ca1f-4336-b283-e5311db13538.jpg";
const CartItem = ({ product }) => {
  const {
    _id,
    img = imageUrl,
    title,
    price,
    orderQuantity = 0,
    selectedVariant,
  } = product || {};

  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product img" width={70} height={100} />
          <p>{product.name}</p>
          <p>
            {selectedVariant.volume} {selectedVariant.unit.name}
          </p>
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>${(selectedVariant.sell_price * orderQuantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd(product)}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
