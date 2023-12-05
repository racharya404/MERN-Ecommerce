import React, { useEffect } from "react";
import {  MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../../redux/actions/order";
import Loader from "../../Layout/Loader";
import { getAllSellers } from "../../../redux/actions/sellers";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning = adminOrders?.reduce((acc, item) => acc + item.totalPrice * 1.0, 0)?.toFixed(2);
  const adminBalance = adminEarning;

  const commonIconProps = {
    size: 30,
    className: "mr-0.5",
  };

  const icons = {
    totalEarning: <MdCurrencyRupee {...commonIconProps} />,
    allSellers: <GrWorkshop {...commonIconProps} />,
    allOrders: <FiShoppingBag {...commonIconProps} />,
  };

  const overviewItems = [
    { title: "Total Earning", value: adminBalance, url: null, icon: icons.totalEarning },
    { title: "All Sellers", value: sellers?.length, url: "/admin-sellers", icon: icons.allSellers },
    { title: "All Orders", value: adminOrders?.length, url: "/admin-orders", icon: icons.allOrders },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    { field: "createdAt", headerName: "Order Date", type: "number", minWidth: 130, flex: 0.8 },
  ];

  const rows = adminOrders?.map(item => ({
    id: item._id,
    itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
    total: `Rs.${item?.totalPrice}`,
    status: item?.status,
    createdAt: item?.createdAt.slice(0, 10),
  })) || [];

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            {overviewItems.map((item, index) => (
              <div key={index} className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  {item.icon}
                  <h3 className="text-[18px] leading-5 font-[400] text-[#00000085]">{item.title}</h3>
                </div>
                {
                  item.title === "Total Earning" ?(
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">Rs.{item.value}</h5>
                ):
                (<h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{item.value}</h5>)
                }
                {item.url && (
                  <Link to={item.url}>
                    <h5 className="pt-4 pl-2 text-[#077f9c]">View {item.title}</h5>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid rows={rows} columns={columns} pageSize={4} disableSelectionOnClick autoHeight />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
