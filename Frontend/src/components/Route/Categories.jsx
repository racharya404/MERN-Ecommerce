import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import styles from "../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>

      {/* Categories */}

      <div
        className={`${styles.section} hidden sm:block cursor-pointer `}
        id="categories"
      >
        <div className="branding my-5 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  style={{
                    width: "15rem",
                    borderRadius: "1rem",
                    boxShadow: "0px 10px 8px #999",
                    display: "flex",
                    flexDirection: " column",
                    margin: "0.5rem",
                    backgroundColor: "white",
                    height: "fit-content",
                  }}
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >

                  <>
                    <h5 style={{
                      margin: "0.5rem 5%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}>
                      {i.title}
                    </h5>
                    <img
                      src={i.image_Url}
                      className="w-[120px] object-cover"
                      style={{
                        width: "65px",
                        height: "66px",
                        objectFit: "contain",
                        marginLeft: "10px",
                        userSelect: "none",
                      }}
                      alt=""
                    />
                  </>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
