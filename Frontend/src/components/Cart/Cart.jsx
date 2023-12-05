import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => dispatch(removeFromCart(data));
  const quantityChangeHandler = (data, qty) => dispatch(addTocart({ ...data, qty }));

  const totalPrice = cart.reduce((acc, { qty, discountPrice }) => acc + qty * discountPrice, 0);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-opacity-40 z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[45%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <>
          <div>
            <div className={`${styles.commonFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} items</h5>
              <RxCross1 size={25} className="cursor-pointer ml-auto" onClick={() => setOpenCart(false)} />
            </div>

            <div className="w-full border-t">
              {cart && cart.length === 0 ? (
                <div>
                  <div className="text-center flex items-center justify-center h-full mx-auto">
                    <h3>No Items Found</h3>
                  </div>
                  <Link to="/products">
                    <h5 className="text-[#0026ff] cursor-pointer underline text-center flex items-center justify-center h-full mx-auto">
                      Click Here To View Products
                    </h5>
                  </Link>
                </div>
              ) : cart && cart.map((item, index) => (
                <>
                  <CartSingle
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                </>
              ))}
            </div>
          </div>
          <div className="px-5 mb-3">
            {cart && cart.length === 0 ? (
              <Link to="/products">
                <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#8f3f3f] rounded-[5px]`}>
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    View All Products
                  </h1>
                </div>
              </Link>
            ) : (<Link to="/checkout">
              <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#8f3f3f] rounded-[5px]`}>
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Buy Now ( Rs. {totalPrice} )
                </h1>
              </div>
            </Link>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const updateQuantity = (increment) => {
    const newQty = increment ? Math.min(data.stock, value + 1) : Math.max(1, value - 1);
    setValue(newQty);
    quantityChangeHandler(data, newQty);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div className="bg-[#FAFAFA] flex flex-col items-center min-width-[10px]">
          <button
            className="text-[#9E9E9E] pt-1 pl-2 pr-3 pb-1 font-bold  shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => updateQuantity(true)}
          >
            +
          </button>
          <span className="text-[#9E9E9E] font-medium px-4">
            {value}
          </span>
          <button
            className="text-[#9E9E9E] pt-1 pl-3 pr-2 pb-1 font-bold shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => updateQuantity(false)}
          >
            -
          </button>
        </div>

        <img src={data?.images[0]?.url} alt="" className="w-[130px] h-min ml-2 mr-2 rounded-[5px]" />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">Rs.{data.discountPrice} * {value}</h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">Rs.{totalPrice}</h4>
        </div>
        <RxCross1 className="cursor-pointer ml-auto" onClick={() => removeFromCartHandler(data)} />
      </div>
    </div>
  );
};

export default Cart;