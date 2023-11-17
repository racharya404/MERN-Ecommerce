import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import BackToTop from "../../components/Layout/BackToTop.jsx";

const socialMediaIcons = [
  <AiFillFacebook size={30} className="cursor-pointer" />,
  <AiFillInstagram size={30} style={{ marginLeft: "15px", cursor: "pointer" }} />,
  <AiFillYoutube size={30} style={{ marginLeft: "15px", cursor: "pointer" }} />,
  <AiOutlineTwitter size={30} style={{ marginLeft: "15px", cursor: "pointer" }} />,
];

const Footer = () => {
  return (
    <div className="bg-[#232F3E] text-white">
      <div>
        <BackToTop />
      </div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-3 py-5 sm:text-center">
        {[
          { title: "Customer Care", links: footerSupportLinks },
          { title: "Our Shop", links: footercompanyLinks },
          { title: "KhullaBazzar", links: footerProductLinks },
        ].map((section, index) => (
          <ul key={index} className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">{section.title}</h1>
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
        <div className="text-center sm:text-start">
          <h1 className=" mb-2 font-semibold">Follow Us</h1>
          <div className="flex">
            {socialMediaIcons}
          </div>
          <h1 className="font-semibold mb-2">Payment Methods</h1>
          <img
            src="https://www.weblinknepal.com/ckfinder/userfiles/images/Online-Payment-Gateway.jpg"
            alt=""
            className="h-[80px] w-[180px]"
          />
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm pb-2">
        <span>© 2023 Rojan. All rights reserved&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Terms · Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
