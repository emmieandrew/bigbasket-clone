import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRightSm, ArrowRightSmTwo } from "@/svg";
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
            <div className="col-lg-6 col-md-12">
              <div className="tp-section-title-wrapper-3 mb-30">
                <span className="tp-section-title-pre-3">
                  Product Collection
                </span>
                <h3 className="tp-section-title-3">Discover our products ss</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="tp-category-more-3 text-md-end mb-35">
                <div className="col-md-8 ms-auto">
                <div className="row  align-items-center">
                <div className="col-8 col-md-8">
                  <div className="d-flex justify-content-end justify-content-lg-center">
                  <Link href="/shop" className="tp-btn bg-white">
                    <span className="me-1">  Shop All Products</span>
                     <ArrowRightSmTwo />
                  </Link>
                  </div>
                </div>
                <div className="col-4 col-md-4">
                   <div className="viweSlideIcons d-flex justify-content-end">
                       <div className="viweLeftIcon me-2">
                        <button className="btn shadow-sm bg-white" type="button">
                          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.829 19a.998.998 0 0 1-.78-.373l-4.828-6a1 1 0 0 1 .01-1.267l5-6a1 1 0 1 1 1.536 1.28l-4.474 5.371 4.315 5.362a1 1 0 0 1-.78 1.627Z" fill="#231F20"></path><mask id="arrow-ios-left_svg__a" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.829 19a.998.998 0 0 1-.78-.373l-4.828-6a1 1 0 0 1 .01-1.267l5-6a1 1 0 1 1 1.536 1.28l-4.474 5.371 4.315 5.362a1 1 0 0 1-.78 1.627Z" fill="#fff"></path></mask><g mask="url(#arrow-ios-left_svg__a)"><path fill="#606060" d="M0 0h24v24H0z"></path></g></svg>
                       </button>
                        </div>
                        <div className="viweRightIcon">
                        <button className="btn shadow-sm bg-white" type="button">
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19a1 1 0 0 1-.768-1.64l4.476-5.371-4.316-5.362a1 1 0 0 1 1.56-1.254l4.828 6a1 1 0 0 1-.011 1.267l-5 6a1 1 0 0 1-.77.36Z" fill="#231F20"></path><mask id="arrow-ios-right_svg__a" mask-type="alpha" maskUnits="userSpaceOnUse" x="9" y="5" width="8" height="14"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19a1 1 0 0 1-.768-1.64l4.476-5.371-4.316-5.362a1 1 0 0 1 1.56-1.254l4.828 6a1 1 0 0 1-.011 1.267l-5 6a1 1 0 0 1-.77.36Z" fill="#fff"></path></mask><g mask="url(#arrow-ios-right_svg__a)"><path fill="#606060" d="M0 0h24v24H0z"></path></g></svg>
                        </button>
                       </div>
                   </div>
                </div>
                </div>
                </div>
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
