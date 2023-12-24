import React from 'react'
import Header from "../components/Layout/Header";
import InitialBanner from "../components/Route/InitialBanner";
import Categories from "../components/Route/Categories";
import BestDeals from "../components/Route/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct";
import Events from "../components/Events/Events";
import Advertisement from "../components/Route/Advertisement";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <InitialBanner />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Advertisement />
      <Footer />
    </>
  )
}

export default HomePage