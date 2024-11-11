import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// internal
import { ArrowNext, ArrowPrev } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeThreePrdLoader } from "@/components/loader";

// Slider settings with inline style references
const sliderSettings = {
  spaceBetween: 20,
  slidesPerView: 5,
  navigation: {
    nextEl: ".product-slider-next",
    prevEl: ".product-slider-prev",
  },
  pagination: {
    el: ".product-slider-pagination",
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
  },
};

const ProductArea = ({ title, products }) => {
  console.log("products: ", products);
  let content = null;
  if (products?.length > 0) {
    const productItems = products.slice(0, 5);
    content = (
      <Swiper
        {...sliderSettings}
        modules={[Navigation, Pagination]}
        className="product-swiper"
      >
        <div>
          {/* decrebase the width of product container so th arrow should get some 10% width? */}
          {productItems.map((prd) => (
            <SwiperSlide key={prd._id}>
              <ProductItem product={prd} />
            </SwiperSlide>
          ))}
        </div>
        <div
          className="product-slider-pagination d-sm-none"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        ></div>
        <div
          className="product-slider-arrow"
          style={{
            position: "absolute",
            top: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 999,
          }}
        >
          <button type="button" className="product-slider-prev">
            <ArrowPrev />
          </button>
          <button type="button" className="product-slider-next">
            <ArrowNext />
          </button>
        </div>
      </Swiper>
    );
  }

  return (
    <section
      className="tp-product-area grey-bg-8 pt-95 pb-80"
      style={{ position: "relative" }}
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-6 col-md-8">
            <div className="tp-section-title-wrapper-3 mb-55">
              <span className="tp-section-title-pre-3">Shop by Category</span>
              <h3 className="tp-section-title-3">{title}</h3>
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="tp-product-more-3 text-md-end mb-65">
              <Link href="/shop" className="tp-btn">
                Shop All Products
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">{content}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductArea;
