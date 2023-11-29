import React from 'react'
import DashboardHeader from '../MainPages/Header'
import DashboardSideBar from '../MainPages/SideBar'
import AllVouchers from "../MainPages/AllVouchers";

const SellerDashboardVouchers = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={8} />
            </div>
            <div className="w-full justify-center flex">
                <AllVouchers />
            </div>
          </div>
    </div>
  )
}

export default SellerDashboardVouchers