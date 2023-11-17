import React from "react";
import { Link } from "react-router-dom";
import { SellerSideBarItems } from "../../../static/data";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const SidebarIcons = [
  RxDashboard,
  FiShoppingBag,
  FiPackage,
  AiOutlineFolderAdd,
  MdOutlineLocalOffer,
  VscNewFile,
  CiMoneyBill,
  AiOutlineGift,
  HiOutlineReceiptRefund,
  CiSettings
];

const SideBar = ({ active }) => {
  return (
    <div className="flex">
      <div className="w-[220px] h-[90vh] bg-white shadow-sm overflow-y-scroll">
        {SellerSideBarItems.map((item, index) => (
          <div
            key={index}
            className="w-full flex items-center p-2 justify-start  rounded-lg shadow-md"
          >
            <Link to={item.url} className="w-full flex items-center">
              {React.createElement(SidebarIcons[index], {
                size: 23,
                color: active === index + 1 ? "crimson" : "#555",
              })}
              <h5
                className={`pl-2 pr-2 text-[17px] font-bold font-[300] ${active === index + 1 ? "text-[crimson]" : "text-[#555]"
                  }`}
              >
                {item.title}
              </h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
