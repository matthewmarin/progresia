import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import darkMode from "../hooks/darkMode";
import { BsClipboard2DataFill } from "react-icons/bs";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = darkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkSide;
    setColorTheme(newDarkMode ? "dark" : "light");
    setDarkSide(newDarkMode);
  };

  const boards = useSelector((state) => state.boards);
  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-28 mt-[-30px] bg-[#00000080]"
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
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline dark:text-white space-x-2 px-5 py-4  ${
                board.isActive &&
                "bg-[#d8c648] dark:bg-[#33c6d8] rounded-r-full text-black mr-8 transition:all"
              }`}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <BsClipboard2DataFill className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          <div
            className="flex items-baseline space-x-2 text-black dark:text-white px-5 py-4 cursor-pointer rounded-r-full mr-8 hover:bg-[#ff6f70]"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <BsClipboard2DataFill className="h-4 " />
            <p className="text-md font-bold">Create New Board</p>
          </div>
          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <button
              onClick={toggleDarkMode} // Toggle between light and dark mode
              className={`text-3xl ${
                darkSide ? "text-gray-300" : "text-yellow-500"
              } focus:outline-none`}
            >
              <MdLightMode />
            </button>

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${darkSide ? "bg-[#33c6d8]" : "bg-[#d8c648]"}
            relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${darkSide ? "translate-x-6" : "translate-x-1"}
                inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <button
              onClick={toggleDarkMode} // Toggle between light and dark mode
              className={`text-3xl ${
                darkSide ? "text-black" : "text-gray-300"
              } focus:outline-none`}
            >
              <MdDarkMode />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
