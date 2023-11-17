import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import Loader from "../../Layout/Loader";
import { MdCurrencyRupee } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";


const DashboardMain = () => {
  const dispatch = useDispatch();
  const { orders, orderLoading } = useSelector((state) => state.order);
  const { seller, products } = useSelector((state) => state.seller);
  const commonIconProps = {
    size: 30,
    className: "mr-0.5",
  };
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, []);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const overviewItems = [
    {
      title: "Account Balance",
      value: availableBalance,
      url: "/dashboard-withdraw-money",
      icon: <MdCurrencyRupee {...commonIconProps} />,
    },
    {
      title: "All Orders",
      value: orders?.length,
      url: "/dashboard-orders",
      icon: <GrWorkshop {...commonIconProps} />,
    },
    {
      title: "All Products",
      value: products?.length,
      url: "/dashboard-products",
      icon: <FiShoppingBag {...commonIconProps} />,
    },
  ];

  return (
    <>
      {orderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            {overviewItems.map((item, index) => (
              <div key={index} className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  {item.icon}
                  <h3 className="text-[18px] leading-5 font-[400] text-[#00000085]">
                    {item.title} {item.title === "Account Balance" && <span className="text-[16px]">(with 10% service charge)</span>}
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                  {item.title === "Account Balance" ? `Rs.${item.value}` : item.value}
                </h5>
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
            <DataGrid rows={orders?.map((item) => ({
              id: item._id,
              itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
              total: `Rs.${item?.totalPrice}`,
              status: item?.status,
            })) || []} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMain;

