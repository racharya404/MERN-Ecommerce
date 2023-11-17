import React from 'react'
import AdminHeader from "../Main_Layout/AdminHeader";
import AdminSideBar from '../Main_Layout/AdminSideBar'
import AdminAllWithdraw from "../Main_Layout/AdminAllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
         <AdminAllWithdraw />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardWithdraw

