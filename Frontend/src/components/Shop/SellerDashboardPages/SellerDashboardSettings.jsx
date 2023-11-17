import React from "react";
import Footer from "../../Layout/Footer";
import ShopSettings from "../MainPages/ShopSettings";
import DashboardHeader from "../MainPages/Header";
import DashboardSideBar from "../MainPages/SideBar";

const SellerDashboardSettings = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default SellerDashboardSettings;
