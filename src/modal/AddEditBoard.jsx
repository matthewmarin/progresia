import React, { useState } from "react";

function AddEditBoard({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
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
            border border-gray-500 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Building New Website"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditBoard;
