import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import Ratings from "../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  

  return (
    <>
      <div style={{
        borderRadius: "1rem",
        boxShadow: "0px 10px 8px #999",
      }}>
        <div className="w-full h-[270px] bg-white rounded-lg shadow-sm p-3 relative ">
          <div className="flex justify-end"></div>
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt=""
              className="w-full h-[120px] object-contain cursor-pointer"
            />
          </Link>
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className={`cursor-pointer ${styles.shopName}`}>{data.shop.name}</h5>
          </Link>
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <h4 className="pb-1 font-[500]">
              {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
            </h4>

            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>

            <div className="flex items-center justify-between">
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
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
