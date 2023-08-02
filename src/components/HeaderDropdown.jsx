import React from "react";
import { useSelector } from "react-redux";

function HeaderDropdown({ setOpenDropdown }) {
  const boards = useSelector((state) => state.boards);
  console.log("boards", boards);
  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-24 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All Boards
        </h3>
        <div></div>
      </div>
    </div>
  );
}

export default HeaderDropdown;