import React from 'react'
import DashboardHeader from '../MainPages/Header'
import DashboardSideBar from '../MainPages/SideBar'
import AllOrders from "../MainPages/AllOrders";

const SellerDashboardOrders = () => {
  return (
        <div>
            <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={2} />
                </div>
                <div className="w-full justify-center flex">
                   <AllOrders />
                </div>
              </div>
        </div>
  )
}

export default SellerDashboardOrders