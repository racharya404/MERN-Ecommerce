import React from 'react';
import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <div>
        <div className="ml-1">
            <Link to="/">
              <h1 className="font-montserrat font-bold p-1 text-white text-lg bg-[#232F3E]">
                KhullaBazzar
              </h1>
            </Link>
          </div>
    </div>
  )
}

export default Logo;