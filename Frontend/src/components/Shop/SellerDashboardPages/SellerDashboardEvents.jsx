import React from 'react'
import DashboardHeader from '../MainPages/Header'
import DashboardSideBar from '../MainPages/SideBar'
import AllEvents from "../MainPages/AllEvents";

const SellerDashboardEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default SellerDashboardEvents