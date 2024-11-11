import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderThree from "@/layout/headers/header-3";
import BeautyBanner from "@/components/banner/beauty-banner";
import BeautyCategory from "@/components/categories/beauty-category";
import BeautyFeatured from "@/components/features/beauty-featured";
import ProductArea from "@/components/products/beauty/product-area";
import BeautyOfferBanner from "@/components/offer-banner/beauty-offer-banner";
import ProductAreaTwo from "@/components/products/beauty/product-area-2";
import TrendingSpecialPrd from "@/components/products/beauty/trending-special-prd";
import BeautyTestimonial from "@/components/testimonial/beauty-testimonial";
import FeatureAreaTwo from "@/components/features/feature-area-2";
import InstagramAreaThree from "@/components/instagram/instagram-area-3";
import Footer from "@/layout/footers/footer";
import PinCodeModal from "@/components/pin-code-modal/PinCodeModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPinCode } from "@/redux/features/pinCodeSlice";
import { useGetAllProductsByZipCodeQuery } from "@/redux/features/productApi";
import useSyncCartData from "@/hooks/useSyncCartData";

export default function Home() {
  const { user: userInfo } = useSelector((state) => state.auth);
  useSyncCartData();

  const { pinCode } = useSelector((state) => state.pinCode);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedPinCode = localStorage.getItem("pinCode");
    if (storedPinCode) {
      dispatch(setPinCode(storedPinCode));
    }
  }, []);

  const {
    data: products = {
      products: [],
      categories: [],
    },
    isError,
    isLoading,
  } = useGetAllProductsByZipCodeQuery(pinCode, {
    skip: !pinCode, // Skip the query if zipcode is null
  });

  console.log("products: ", products);
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <PinCodeModal />
      <HeaderThree />
      <BeautyBanner />
      <BeautyCategory />
      {/* <BeautyFeatured /> */}
      {products.products.map((category, _id) => {
        return (
          <ProductArea
            key={_id}
            title={category.heading}
            products={category.items}
          />
        );
      })}
      {/* <ProductArea title={"New arrivals"} />
      <ProductArea title={"Featured products"} /> */}
      {/* <BeautyOfferBanner /> */}
      {/* <ProductAreaTwo /> */}
      {/* <TrendingSpecialPrd /> */}
      <BeautyTestimonial />
      <FeatureAreaTwo />
      {/* <InstagramAreaThree /> */}
      <Footer style_3={true} />
    </Wrapper>
  );
}
