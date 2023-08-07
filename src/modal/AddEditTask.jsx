import React, { useState } from "react";

function AddEditTask({ type, device, setOpenAddEditTask }) {
  const [title, setTitle] = useState("");

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      {/* Modal Section */}
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37]
      text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8
      rounded-xl "
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm
          border border-gray-600 focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] ring-0"
            type="text"
            placeholder="e.g Take a lunch break"
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditTask;
