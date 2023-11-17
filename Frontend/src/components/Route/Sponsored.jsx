import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-5 px-5 mb-6 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <a href="https://www.ncell.axiata.com/en">
            <img
              src="https://www.onlinekhabar.com/wp-content/uploads/2022/09/Onlinekhabar-1140x100-1.gif"
              alt="Visit The Page"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
