import React from 'react'
import DashboardHeader from '../../components/Shop/MainPages/Header'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
         <DashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default ShopOrderDetails