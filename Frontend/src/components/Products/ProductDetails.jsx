import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import ProductDetailsInfo from "./ProductDetailsInfo";
import styles from "../../styles/styles";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const redundantStyles = "text-black flex items-center pt-1 pl-2 pr-2 shadow-lg cursor-pointer";

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${select === 0 ? "border" : "null"
                          } cursor-pointer`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[50px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                <h5 className={`${styles.productDiscountAmount}`}>
                Rs.
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
              </h5>
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
                <div className="flex items-center mt-12 justify-between pr-3 ">
                  <div className="bg-[#FAFAFA]">
                    <button
                      className="text-[#9E9E9E] pt-1 pl-2 pr-3 pb-1 font-bold  shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="text-[#9E9E9E] font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className=" text-[#9E9E9E] pt-1 pl-3 pr-2 pb-1 font-bold  shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div className="bg-[#FAFAFA] flex">
                    <div
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className={redundantStyles}>
                        Add to cart <AiOutlineShoppingCart onClick={() => addToCartHandler(data._id)}
                         size={30} 
                         className="ml-1" 
                         color={click ? "#000000" : "#333"} 
                         />
                      </span>
                    </div>
                    <div>
                      {click ? (
                        <span 
                         onClick={() => removeFromWishlistHandler(data)}
                         className={redundantStyles}>
                      Remove From Wishlist
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                        </span>
                      ) : (
                        <span 
                        onClick={() => addToWishlistHandler(data)}
                        className={redundantStyles}>
                        Add To Wishlist
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                        </span>
                      )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
