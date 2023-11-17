import React from 'react'
import AdminHeader from "../Main_Layout/AdminHeader";
import AdminSideBar from '../Main_Layout/AdminSideBar'
import AdminAllOrders from "../Main_Layout/AdminAllOrders";

const AdminDashboardOrders = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <AdminAllOrders />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardOrders;