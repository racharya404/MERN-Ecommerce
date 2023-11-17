import React from 'react'
import DashboardHeader from '../MainPages/Header'
import DashboardSideBar from '../MainPages/SideBar'
import AllRefundOrders from "../MainPages/AllRefundOrders";

const SellerDashboardRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardRefunds;