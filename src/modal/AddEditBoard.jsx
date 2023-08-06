import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";

function AddEditBoard({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [newColumn, setNewColumn] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  const onChange = (id, newValue) => {
    setNewColumn((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumn((perState) => perState.filter((el) => el.id !== id));
  };
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll 
      z-50 justify-center items-center flex bg-[#00000080]"
    >
      {/* Modal Section */}
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white 
      font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm outline-none
            border border-gray-500 focus:outline-[#d8c648] dark:focus:outline-[#33c6d8]"
            placeholder="e.g Building New Website"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumn.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md
                    text-sm border border-gray-600 outline-none focus:outline-[#d8c648] dark:focus:outline-[#33c6d8]"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <RxCross1
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#635fc7]\
            text:white bg-[#d8c648] dark:bg-[#33c6d8] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumn((prevState) => [
                ...prevState,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            +Add New Column
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoard;
