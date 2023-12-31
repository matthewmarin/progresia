import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import darkMode from "../hooks/darkMode";
import boardsSlice, { setBoards } from "../redux/boardsSlice";
import { BsClipboard2DataFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import AddEditBoard from "../modal/AddEditBoard";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { fetchBoards, fetchColumnsAndTasks } from "../utils/api";

function Sidebar({ setIsSideBarOpen, isSideBarOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [colorTheme, setColorTheme] = darkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  useEffect(() => {
    fetchBoards(dispatch);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkSide;
    setColorTheme(newDarkMode ? "dark" : "light");
    setDarkSide(newDarkMode);
  };

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? "min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20"
            : "bg-white dark:bg-[#2b2c37] hover:text-[#d8c648] dark:hover:text-[#33c6d8] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-full"
        }
      >
        <div>
          {/* Rewrite Modal */}

          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>
              <div className="flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline scroll-px-2 px-5 mr-8 rounded-r-full
                  duration-500 ease-in-out py-4 cursor-pointer
                  hover:text-black dark:hover:text-black
                  hover:opacity-300 dark:hover:opacity-300 dark:text-white 
                  ${
                    board.isActive &&
                    "bg-[#d8c648] dark:bg-[#33c6d8] rounded-r-full text-black dark:text-white mr-8"
                  }`}
                      key={index}
                      onClick={async () => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));

                        // Fetch columns and tasks for the selected board
                        const selectedBoard = boards[index];
                        try {
                          const columnsAndTasksData =
                            await fetchColumnsAndTasks(selectedBoard.id);
                          if (columnsAndTasksData) {
                            // Dispatch an action to update columns and tasks in Redux store
                            dispatch(
                              boardsSlice.actions.updateColumnsAndTasks({
                                index,
                                columnsAndTasksData,
                              })
                            );
                          }
                        } catch (error) {
                          console.error(
                            "Error fetching columns and tasks:",
                            error
                          );
                        }
                      }}
                    >
                      <BsClipboard2DataFill className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500
                  ease-in-out cursor-pointer text-black dark:text-white px-5 py-4
                  hover:bg-[#d8c648] dark:hover:bg-[#33c6d8] hover:text-white dark:hover:text-black"
                  >
                    <BsClipboard2DataFill className="h-4" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>
                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
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
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      }
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
          )}

          {/* Sidebar hide/show toggle */}

          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full
            hover:bg-[#d8c648] dark:hover:bg-[#33c6d8] hover:text-black dark:hover:text-white
            cursor-pointer mr-6 mb-8 px-8 py-4 space-x-2 justify-center my-4 text-gray-500"
            >
              <BiSolidHide className="min-w-[20px]" />
              {isSideBarOpen && <p> Hide Sidebar</p>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-4 ml-1"
            >
              <BiSolidShow />
            </div>
          )}
        </div>
      </div>
      {isBoardModalOpen && (
        <AddEditBoard type="add" setBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default Sidebar;
