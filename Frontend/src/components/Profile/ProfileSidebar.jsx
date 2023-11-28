import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Logout handler
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${server}/user/logout`, { withCredentials: true });
      toast.success(response.data.message);
      window.location.reload(true);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Sidebar items
  const sidebarItems = [
    { icon: <RxPerson size={20} />, title: "Profile" },
    { icon: <HiOutlineShoppingBag size={20} />, title: "Orders" },
    { icon: <HiOutlineReceiptRefund size={20} />, title: "Refunds" },
    { icon: <TbAddressBook size={20} />, title: "Address" },
    { icon: <MdOutlineTrackChanges size={20} />, title: "Track Order" },
    { icon: <RiLockPasswordLine size={20} />, title: "Change Password" },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className={`w-full  flex items-center p-2 justify-start  rounded-lg shadow-md cursor-pointer`}
          onClick={() => setActive(index + 1)}
        >
          {item.icon}
          <span
            className={`pl-3 ${active === index + 1 ? "text-[red] " : ""} 800px:block hidden`}
          >
            {item.title}
          </span>
        </div>
      ))}

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className={`w-full flex items-center p-2 justify-start cursor-pointer  rounded-lg shadow-md`}
            onClick={() => setActive(sidebarItems.length + 1)}
          >
            <MdOutlineAdminPanelSettings size={20} color={active === 7 ? "red" : ""} />
            <span
              className={`pl-3 ${active === 7 ? "text-[red]" : ""} 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      <div
        className="w-full flex items-center p-2 justify-start cursor-pointer  rounded-lg shadow-md"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
