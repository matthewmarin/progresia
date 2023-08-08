import React, { useState } from "react";
import AddEditBoard from "../modal/AddEditBoard";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div
      className="bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col
    items-center text-center justify-center"
    >
      <h3 className="text-gray-500 font-bold">
        {type === "edit"
          ? "This board is empty . Create a new column to get started"
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70
      mt-8 relative py-2 rounded-full dark:text-white
      text-black bg-[#d8c648] dark:bg-[#33c6d8]"
      >
        {type === "edit" ? "+ Add New Board" : "+ Add New Project"}
      </button>

      {isBoardModalOpen && (
        <AddEditBoard type={type} setBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default EmptyBoard;
