import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// internal
import logo_white from '@assets/img/logo/logo-white.svg';
import logo_dark from '@assets/img/logo/logo.svg';
import { CartTwo, Menu, Search, Wishlist } from '@/svg';
import Menus from './header-com/menus';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';
import Location from '@/components/Location'
const HeaderThree = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <header>
        <div id="header-sticky" className={`tp-header-area tp-header-style-transparent-white tp-header-transparent tp-header-sticky has-dark-logo tp-header-height ${sticky ? 'header-sticky' : ''}`}>
          <div className="tp-header-bottom-3 pl-35 pr-35 py-2">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-4">
                  <div className="logo">
                    <Link href="/">
                      {/* <Image className="logo-light" src={logo_white} alt="logo" />s */}
                      <Image className="logo-dark" src={logo_dark} alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                  <div className="main-menu menu-style-3 p-relative d-flex align-items-center justify-content-center">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-8">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-30">
                  <span
        onClick={openModal}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "none",
          border: "1px solid #000",
          color: "#000",
          padding: "2px 5px",
          display: "flex",
          alignItems: "center"
        }}
      >
      <svg width={14} height={14} viewBox="-83.5 0 500 500" style={{ marginRight:"2px", }}>
        <g fill-rule="evenodd">
          <path d="M166.5,482 C 245,396 328,273 333,181 A166.5,166.5 0 0 0 0,181 C 5,273 88,396 166.5,482 Z M 226,178 A59.5,59.5 0 0 1 107,178 A59.5,59.5 0 0 1 226,178 Z"></path>
        </g>
      </svg>
       <span> Select Location</span>
      </span>
      <Location isModalOpen={isModalOpen} closeModal={closeModal}></Location>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button onClick={() => setIsSearchOpen(true)} type="button" className="tp-header-action-btn tp-search-open-btn">
                        <Search />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <Wishlist />
                        <span className="tp-header-action-badge">{wishlist.length}</span>
                      </Link>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button onClick={() => dispatch(openCartMini())} type="button" className="tp-header-action-btn cartmini-open-btn">
                        <CartTwo />
                        <span className="tp-header-action-badge">{quantity}</span>
                      </button>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button onClick={() => setIsCanvasOpen(true)} type="button" className="tp-header-action-btn tp-offcanvas-open-btn">
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="beauty" />
      {/* off canvas end */}
    </>
  );
};

export default HeaderThree;