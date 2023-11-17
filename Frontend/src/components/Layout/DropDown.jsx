import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {setDropDown && <div className="fixed top-0 left-0 w-full h-full z-20" onClick={() => setDropDown(false)}></div>}
      <div ref={dropdownRef} className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
        {categoriesData &&
          categoriesData.map((i, index) => (
            <div key={index} className={`${styles.commonFlex}`} onClick={() => submitHandle(i)}>
              <img
                src={i.image_Url}
                style={{ width: "25px", height: "25px", objectFit: "contain", marginLeft: "10px", userSelect: "none" }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default DropDown;
