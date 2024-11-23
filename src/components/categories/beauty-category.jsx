import React from "react";
import Link from "next/link";
// internal
import ErrorMsg from "../common/error-msg";
import { ArrowRightSm, ArrowRightSmTwo } from "@/svg";
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";
import { HomeThreeCategoryLoader } from "../loader";
import { useRouter } from "next/router";
const BeautyCategory = () => {
  const router = useRouter();
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetProductTypeCategoryQuery("beauty");

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(
      `/shop?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeThreeCategoryLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <div key={item._id} className="col-lg-3 col-sm-6">
        <div className="tp-category-item-3 p-relative black-bg text-center z-index-1 fix mb-30">
          <div
            className="tp-category-thumb-3 include-bg"
            style={{ backgroundImage: `url(${item.img})` }}
          ></div>
          <div className="tp-category-content-3 transition-3">
            <h3 className="tp-category-title-3">
              <a
                className="cursor-pointer"
                onClick={() => handleCategoryRoute(item.parent)}
              >
                {item.parent}
              </a>
            </h3>
            <span className="tp-categroy-ammount-3">
              {item.products.length} Products
            </span>
            <div className="tp-category-btn-3">
              <a
                onClick={() => handleCategoryRoute(item.parent)}
                className="cursor-pointer tp-link-btn tp-link-btn-2"
              >
                View Now
                <ArrowRightSm />
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <section className="tp-category-area pt-95">
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
                  <Link href="/shop" className="tp-btn">
                    <span className="me-1">  Shop All Products</span>
                     <ArrowRightSmTwo />
                  </Link>
                  </div>
                </div>
                <div className="col-4 col-md-4">
                   <div className="viweSlideIcons d-flex justify-content-end">
                       <div className="viweLeftIcon me-2">
                        <button className="btn shadow-sm mt-0 px-3" type="button">
                          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.829 19a.998.998 0 0 1-.78-.373l-4.828-6a1 1 0 0 1 .01-1.267l5-6a1 1 0 1 1 1.536 1.28l-4.474 5.371 4.315 5.362a1 1 0 0 1-.78 1.627Z" fill="#231F20"></path><mask id="arrow-ios-left_svg__a" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.829 19a.998.998 0 0 1-.78-.373l-4.828-6a1 1 0 0 1 .01-1.267l5-6a1 1 0 1 1 1.536 1.28l-4.474 5.371 4.315 5.362a1 1 0 0 1-.78 1.627Z" fill="#fff"></path></mask><g mask="url(#arrow-ios-left_svg__a)"><path fill="#606060" d="M0 0h24v24H0z"></path></g></svg>
                       </button>
                        </div>
                        <div className="viweRightIcon">
                        <button className="btn shadow-sm mt-0 px-3" type="button">
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
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default BeautyCategory;
