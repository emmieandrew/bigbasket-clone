import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, Minus, Plus, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import {
  add_cart_product,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const imageUrl =
  "https://cdn.zeptonow.com/production///tr:w-1000,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/b92ec79e-ca1f-4336-b283-e5311db13538.jpg";
const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const { id, name, variants } = product || {};

  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd.id === id);
  const addedProduct = cart_products.find((prd) => prd.id === id);
  const isAddedToWishlist = wishlist.some((prd) => prd.id === id);
  const dispatch = useDispatch();

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState(
    variants ? variants[0] : null
  );

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product({ ...prd, selectedVariant }));
  };

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <div
      className={`tp-product-item-3 mb-50 ${
        primary_style ? "tp-product-style-primary" : ""
      } ${prdCenter ? "text-center" : ""}`}
    >
      <div className="tp-product-thumb-3 tp-product-thumb-top-3  mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${id}`}>
          <Image
            src={imageUrl || variants.images[0]?.original_image}
            alt="product image"
            width={282}
            height={320}
          />
        </Link>

        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column mt-4">
            {/* Variant dropdown */}
            {variants && (
              <div className="tp-product-variant-select">
                <h3>Atta/Godihittu - Whole Wheat</h3>
                <label htmlFor="variantSelect" className="variant-label mb-1">
                  Select Variant:
                </label>
                <select
                  id="variantSelect"
                  value={selectedVariant?.volume}
                  onChange={(e) => {
                    const selectedVariant = variants.find(
                      (v) => v.volume === e.target.value
                    );
                    setSelectedVariant(selectedVariant); // Update the selected variant
                  }}
                  className="variant-dropdown"
                >
                  {variants.map((variant) => (
                    <option key={variant.id} value={variant.size}>
                      {variant.volume} - {variant.sell_price}{" "}
                      {variant.unit.short_name}
                      {variant.volume} {variant.unit.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
            <div className="row">
              <div className="col-md-4">
              <div className="addTocard_Btn">
                 <button type="button">
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor"></path></svg>
              </button>
              </div>
              <div className="col-md-4">
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
              </div>
              </div>
              </div>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>

            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-3 
            ${
              isAddedToWishlist ? "active" : ""
            } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>
          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {isAddedToCart ? (
            <>
              <div className="tp-product-quantity  mt-10 mb-10 mx-auto">
                <span
                  onClick={() => handleDecrement(addedProduct)}
                  className="tp-cart-minus"
                >
                  <Minus />
                </span>
                <input
                  className="tp-cart-input"
                  type="text"
                  value={addedProduct?.orderQuantity || 0}
                  readOnly
                />
                <span
                  onClick={() => handleAddProduct(addedProduct)}
                  className="tp-cart-plus"
                >
                  <Plus />
                </span>
              </div>
              <Link
                href="/cart"
                className="tp-product-add-cart-btn-large text-center"
              >
                View To Cart
              </Link>
            </>
          ) : (
            <div className="addTocard_Btn">

              <div className="row">
                <div className="col-md-4">
              <button type="button">
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor"></path></svg>
              </button>
              </div>
              <div className="col-md-8">
            <button
              onClick={() => handleAddProduct(product)}
              type="button"
              className="tp-product-add-cart-btn-large"
              disabled={status === "out-of-stock"}
            >
              Add To Cart
            </button>
            </div>
            </div>
            </div>
          )}
        </div>
      </div>

      <div className="tp-product-content-3">
        <div className="tp-product-tag-3">{/* <span>{tags[1]}</span> */}</div>
        <h3 className="tp-product-name-3">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>

        <div className="tp-product-price-wrapper-3">
          {/* <span className="tp-product-price-3">${price.toFixed(2)}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
