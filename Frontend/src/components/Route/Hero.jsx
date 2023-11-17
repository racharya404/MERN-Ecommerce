import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import BI from "../../resources/Images/BI.png"


const Hero = () => {
  return (
    <>
      <Link to="/products" classNmae="cursor-pointer">
        <div
          className={`relative h-[520px] w-full bg-no-repeat ${styles.commonFlex}`}
          style={{
            backgroundImage: `url(${BI})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',

          }}
        >
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="flex text-[#000000] bg-white font-[Poppins] text-[18px] ml-auto border-2 border-black hover:text-white hover:bg-black ">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </Link>
    </>

  );
};

export default Hero;
