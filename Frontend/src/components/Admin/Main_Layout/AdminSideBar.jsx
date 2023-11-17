import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { AdminSideBarItems } from "../../../static/data";

const SidebarIcons = [
  RxDashboard,
  FiShoppingBag,
  GrWorkshop,
  HiOutlineUserGroup,
  BsHandbag,
  MdOutlineLocalOffer,
  CiMoneyBill,
  AiOutlineSetting,
];

const AdminSideBar = ({ active }) => {
  return (
    <div className="flex">
      <div className="w-[220px] h-[90vh] bg-white shadow-sm overflow-y-scroll">
        {AdminSideBarItems.map((item, index) => (
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

export default AdminSideBar;
