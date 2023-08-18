import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoard from "../modal/AddEditBoard";

function Center({ boardModalOpen, setBoardModalOpen }) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const columns = activeBoard?.columns || [];

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={`bg-[#f4f7fd] scrollbar-hide h-screen flex ${
        windowSize[0] >= 768 && isSideBarOpen
          ? "dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "dark:bg-[#20212c] overflow-x-scroll gap-6"
      }`}
    >
      {/* Sidebar */}
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns */}
      {activeBoard && columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          {/* New Column Button */}
          <div
            onClick={() => {
              setBoardModalOpen(true);
            }}
            className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center
            font-bold text-2xl hover:text-[#d8c648] dark:hover:text-[#33c6d8] transition duration-300
            cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px]
            text-[#828fa3] mt-[135px] rounded-lg"
          >
            + New Column
          </div>
        </>
      ) : (
        // Empty Board
        <EmptyBoard type="edit" />
      )}

      {/* Add/Edit Board Modal */}
      {boardModalOpen && (
        <AddEditBoard type="edit" setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
}

export default Center;
