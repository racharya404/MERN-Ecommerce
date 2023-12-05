import React from "react";
import DashboardHeader from "../MainPages/Header";
import DashboardSideBar from "../MainPages/SideBar";
import DashboardInitialBanner from "../MainPages/DashboardMain";

const SellerDashboardPage = () => {
  return (
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
            <DashboardInitialBanner />
          </div>
        </div>
  );
};

export default SellerDashboardPage;
