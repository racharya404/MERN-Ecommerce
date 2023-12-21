import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import Logo from '../../Layout/Logo';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.user);

  const iconSize = 30;
  const iconColor = '#555';
  const Class = 'lg:block hidden mr-4';

  const icons = [
    <AiOutlineGift size={iconSize} color={iconColor} />,
    <MdOutlineLocalOffer size={iconSize} color={iconColor} />,
    <FiShoppingBag size={iconSize} color={iconColor} />,
    <FiPackage size={iconSize} color={iconColor} />,
  ];

  const links = [
    { url: '/dashboard/cupouns', iconIndex: 0, Class },
    { url: '/dashboard-events', iconIndex: 1, Class },
    { url: '/dashboard-products', iconIndex: 2, Class },
    { url: '/dashboard-orders', iconIndex: 3, Class },
  ];

  return (
    <div className="w-full h-[50px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Logo />
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {links.map(({ url, iconIndex, Class }, index) => (
            <Link key={index} to={url} className={Class}>
              {icons[iconIndex]}
            </Link>
          ))}
          <Link to="/profile">
            <img src={`${user?.avatar?.url}`} alt="" className="w-[39px] h-[39px] border-2 border-blue-500 rounded-full object-cover" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
