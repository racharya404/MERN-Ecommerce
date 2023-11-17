import React from 'react'
import DashboardHeader from '../MainPages/Header'
import WithdrawMoney from "../MainPages/WithdrawMoney";
import DashboardSideBar from '../MainPages/SideBar';

const SellerDashboardWithDrawMoney = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default SellerDashboardWithDrawMoney;