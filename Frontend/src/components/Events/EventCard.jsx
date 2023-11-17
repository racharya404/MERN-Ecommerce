import React from "react";
import styles from "../../styles/styles";
import CountDown from "./EventCountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const redundantStyles = "w-[150px] flex items-center text-black justify-center font-sans shadow-lg text-[15px] cursor-pointer";

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className="w-full h-[270px] bg-white rounded-lg shadow-sm p-3 relative"
    >
      <div className="w-full flex cursor-pointer">
        {data &&
          data.images.map((i, index) => (
            <img
              src={`${i?.url}`}
              alt=""
              className="h-[120px] overflow-hidden mr-3 "
            />
          ))}
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="pb-1 font-[500] cursor-pointer">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h2>
        <p>
          {data.description.length > 70 ? data.description.slice(0, 70) + "..." : data.description}
        </p>
        <div className="flex items-center justify-between">
          <h5 className={`${styles.productDiscountAmount}`}>
            Rs.
            {data.originalPrice === 0
              ? data.originalPrice
              : data.discountPrice}
          </h5>
          <CountDown data={data} />
        </div>
        <div className="flex">
          <h4 className={`${styles.price}`}>
            {data.originalPrice && data.originalPrice > data.discountPrice ? "Rs." + data.originalPrice : null}
          </h4>
          <h4 className="ml-2">
            -{data.originalPrice && data.discountPrice && data.originalPrice > data.discountPrice
              ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
              : null}%
          </h4>
        </div>
      </div>
      <div className="flex items-center">
        <Link to={`/product/${data._id}?isEvent=true`}>
          <div className={redundantStyles}>See Details</div>
        </Link>
        <div className={redundantStyles} onClick={() => addToCartHandler(data)}>
        Add to cart<AiOutlineShoppingCart className="ml-1"/>
        </div>
        <div className="ml-auto">
          {click ? (
            <span
              onClick={() => removeFromWishlistHandler(data)}
            >
              <AiFillHeart
                size={30}
                className="cursor-pointer"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
              />
            </span>
          ) : (
            <span
              onClick={() => addToWishlistHandler(data)}
            >
              <AiOutlineHeart
                size={30}
                className="cursor-pointer"
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#333"}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
