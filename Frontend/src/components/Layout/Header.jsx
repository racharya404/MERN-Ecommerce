import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, headerItems } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import OrgLogo from "../../resources/Images/KB.png";
import { FaCaretSquareDown } from 'react-icons/fa';

const Header = ({ activeHeading }) => {
  const { isUser, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    setActive(window.scrollY > 70);
  });

  return (
    <>
      <div className={`${styles.section} hidden 800px:flex items-center justify-between w-full bg-[#232F3E] h-[10px]`}>
        <div className="w-full my-3 flex ml-10 font-sans text-[9px] cursor-pointer">
          <Link to={`${!isSeller ? "/shop-create" : "/dashboard"}`}>
            <h1 className="text-[#fff] underline ml-1">
              {!isSeller ? "Become a Seller" : "View Dashboard"}
            </h1>
          </Link>
          {headerItems.map((i, index) => (
            <Link key={index} to={i.url}>
              <h1 className="text-[#fff] ml-4 underline">
                {i.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#232F3E] h-[40px]`}>
        <div className={`${styles.section} relative ${styles.commonFlex} justify-between`}>

          <div className="ml-1">
            <Link to="/">
              <h1 className="font-montserrat font-bold p-1 text-white text-lg bg-[#232F3E]">
                KhullaBazzar
              </h1>
            </Link>
          </div>

          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[40px] mt-[4px] hidden 1000px:block">
              <div>
                <button className="flex font-sans text-base text-white font-[500] ml-4 select-none mt-3 p-0.125 border-2 border-white-400 bg-[#232F3E]">
                  All Categories<FaCaretSquareDown className="mt-1.5 ml-2" />
                </button>
              </div>
              {dropDown ? (
                <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
              ) : null}
            </div>
          </div>

          <div className="w-[52%] relative">
            <input
              type="text"
              placeholder="Search in Khullabazzar"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[30px] w-full px-2 rounded-md"
            />
            <AiOutlineSearch size={30} className=" h-[30px] absolute right-2 top-1 cursor-pointer" />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => (
                  <Link key={index} to={`/product/${i._id}`}>
                    <div className="w-full flex items-start-py-3">
                      <img
                        src={`${i.images[0]?.url}`}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex">
            {isSeller && (
              <div className="relative cursor-pointer mr-[15px]">
                <Link to="/dashboard">
                  <RxDashboard size={25} color="#fff" alt="View Dashboard" className="mt-1.5" />
                </Link>
              </div>
            )}

            <div className={`${styles.commonFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishlist(true)}>
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.commonFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.commonFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isUser ? (
                  <Link to="/profile">
                    <img src={`${user?.avatar?.url}`} className="w-[35px] h-[35px] rounded-full" alt="" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <img src={OrgLogo} alt="Khullabazzar" className="w-[50px] h-[50px]" />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]" onClick={() => setOpenWishlist(true) || setOpen(false)}>
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)} />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;
                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link key={i._id} to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img src={i.image_Url[0]?.url} alt="" className="w-[50px] mr-2" />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex w-full justify-center">
                {isUser ? (
                  <div>
                    <Link to="/profile">
                      <img src={`${user.avatar?.url}`} alt="" className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">Login /</Link>
                    <Link to="/sign-up" className="text-[18px] text-[#000000b7]">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
