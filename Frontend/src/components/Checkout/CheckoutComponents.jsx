import React from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";

export const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const handleCheckboxChange = (item) => {
    setAddress1(item.address1);
    setAddress2(item.address2);
    setZipCode(item.zipCode);
    setCountry(item.country);
    setCity(item.city);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8 shadow-md">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input type="text" value={user?.name} required className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input type="email" value={user?.email} required className={`${styles.input}`} />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input type="number" required value={user?.phoneNumber} className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className={`${styles.input}`} />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country && Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={city} onChange={(e) => setCity(e.target.value)}>
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State && State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input type="address" required value={address1} onChange={(e) => setAddress1(e.target.value)} className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input type="address" value={address2} onChange={(e) => setAddress2(e.target.value)} required className={`${styles.input}`} />
          </div>
        </div>
      </form>
      <h5 className="text-[18px] cursor-pointer inline-block" onClick={() => setUserInfo(!userInfo)}>
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user?.addresses.map((item, index) => (
            <div className="w-full flex mt-1" key={index}>
              <input type="checkbox" className="mr-3" value={item.addressType} onClick={() => handleCheckboxChange(item)} />
              <h2>{item.addressType}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CartData = ({ handleSubmit, totalPrice, shipping, subTotalPrice, couponCode, setCouponCode, discountPercentenge }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-md">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Original Price:</h3>
        <h5 className="text-[18px] font-[600]">Rs.{subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping Cost:</h3>
        <h5 className="text-[18px] font-[600]">Rs.{shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount Amount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "Rs." + discountPercentenge.toString() : "Rs.0.00"}
        </h5>
      </div>
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4] mt-3">Total:</h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">Rs.{totalPrice}</h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Voucher Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};
