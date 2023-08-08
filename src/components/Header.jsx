import React, { useState } from "react";
import logo from "../assets/logo.png";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import AddEditBoard from "../modal/AddEditBoard";
import HeaderDropdown from "./HeaderDropdown";
import { useDispatch, useSelector } from "react-redux";
import AddEditTask from "../modal/AddEditTask";
import EllipsisMenu from "./EllipsisMenu";
import DeleteModal from "../modal/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ boardModalOpen, setBoardModalOpen }) {
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsEllipsisOpen(false);
    setBoardType("add");
  };
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}

        <div className="flex items-center space-x-2 md:space-x-4 uppercase">
          <img src={logo} alt="logo" className="h-[50px] w-[130px]" />
          <div className="flex items-center">
            <h3
              className="truncate max-w-[200px] ml-2 mr-2 md:text-2xl text-lg
            font-bold md:ml-20 font-sans"
            >
              {board.name}
            </h3>
            {openDropdown ? (
              <BiSolidUpArrow
                className="w-5 text-xl cursor-pointer text-[#d8c648] dark:text-[#33c6d8] md:hidden"
                onClick={() => setOpenDropdown((state) => !state)}
              />
            ) : (
              <BiSolidDownArrow
                className="w-5 text-xl  cursor-pointer text-[#d8c648] dark:text-[#33c6d8] md:hidden"
                onClick={onDropdownClick}
              />
            )}
          </div>
        </div>

        {/* Right Side */}

        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button bg-[#d8c648] dark:bg-[#33c6d8] py-2 px-4 rounded-full  text-black dark:text-white text-lg font-semibold hover:opacity-80 duration-200 ">
            + Add New task
          </button>
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="button py-1 px-3 md:hidden bg-[#d8c648] dark:bg-[#33c6d8] rounded-full text-black dark:text-white text-lg text-center font-semibold hover:opacity-80 duration-200"
          >
            +
          </button>
          <img
            src={ellipsis}
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsEllipsisOpen((state) => !state);
            }}
            alt="ellipsis"
            className="cursor-pointer h-6"
          />

          {isEllipsisOpen && (
            <EllipsisMenu
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              type="Boards"
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoard type={boardType} setBoardModalOpen={setBoardModalOpen} />
      )}
      {openAddEditTask && (
        <AddEditTask
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type="board"
        />
      )}
    </div>
  );
}

export default Header;
