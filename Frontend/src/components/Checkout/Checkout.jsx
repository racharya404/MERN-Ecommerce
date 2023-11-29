import React, { useState, useEffect } from "react";
import { ShippingInfo, CartData } from "./CheckoutComponents"; // Import the components from CheckoutComponents
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherCodeData, setVoucherCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (!address1 || !address2 || zipCode === null || !country || !city) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = { address1, address2, zipCode, country, city };
      const orderData = { cart, totalPrice, subTotalPrice, shipping, discountPrice, shippingAddress, user };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = voucherCode;

    try {
      const { data: { voucherCode: voucherData } } = await axios.get(`${server}/voucher/get-voucher-value/${name}`);

      if (!voucherData) {
        toast.error("Voucher code doesn't exist!");
        setVoucherCode("");
        return;
      }

      const shopId = voucherData.shopId;
      const isVoucherValid = cart.filter((item) => item.shopId === shopId);

      if (isVoucherValid.length === 0) {
        toast.error("Voucher code is not valid for this shop");
        setVoucherCode("");
        return;
      }

      const eligiblePrice = isVoucherValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
      const discountPrice = (eligiblePrice * voucherData.value) / 100;
      setDiscountPrice(discountPrice);
      setVoucherCodeData(voucherData);
      setVoucherCode("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the voucher code.");
    }
  };

  const discountPercentenge = voucherCodeData ? discountPrice : "";
  const totalPrice = voucherCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8 ">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            voucherCode={voucherCode}
            setVoucherCode={setVoucherCode}
            discountPercentenge={discountPercentenge}
          />
          <div onClick={paymentSubmit}>
            <div className=" mt-3 cursor-pointer w-full h-[30px] rounded-[3px] text-[#000000] bg-white font-[Poppins] text-[18px] text-center border-2 border-black hover:text-white hover:bg-black ">
              Proceed To Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
