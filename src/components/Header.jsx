import React, { useState } from "react";
import logo from "../assets/logo.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropDown";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}

        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-[100px] w-[200px]" />
          <div className="flex items-center">
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3  cursor-pointer md:hidden"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="button">+ Add New task</button>
          <button className="button py-1 px-3 md:hidden">+</button>
          <img src={ellipsis} alt="ellipsis" className="cursor-pointer h-6" />
        </div>
      </header>

      {openDropdown && <HeaderDropdown setOpenDropdown={setOpenDropdown} />}
    </div>
  );
}

export default Header;
