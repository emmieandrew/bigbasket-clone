import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';
import useSyncCartData from '@/hooks/useSyncCartData';


const CheckoutPage = () => {
  const router = useRouter();
  useSyncCartData();

  useEffect(() => {
    const isAuthenticate = Cookies.get("userInfo");
    console.log('isAuthenticate: ', isAuthenticate);
    if(!isAuthenticate){
      router.push("/login")
    }
  },[router])
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} />
      <CheckoutArea/>
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;