import React from 'react'
import AdminHeader from '../Main_Layout/AdminHeader'
import AdminSideBar from '../Main_Layout/AdminSideBar'
import AdminAllEvents from '../Main_Layout/AdminAllEvents';

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px] flex-1 p-4">
            <AdminSideBar active={6} />
          </div>
          <AdminAllEvents />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardEvents;