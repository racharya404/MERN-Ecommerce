import React from 'react'
import DashboardHeader from '../MainPages/Header'
import DashboardSideBar from '../MainPages/SideBar'
import CreateProduct from "../MainPages/CreateProduct";

const SellerDashboardCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default SellerDashboardCreateProduct