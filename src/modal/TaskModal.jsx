import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import EllipsisMenu from "../components/EllipsisMenu";

function TaskModal({ colIndex, taskIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);

  const setOpenEditModal = () => {};

  const setOpenDeleteModal = () => {};

  return (
    <div
      className="fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide
      z-50 bottom-0 justify-center items-center flex bg-[#00000080]"
    >
      {/* Modal Section */}

      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white
      font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
          <img
            src={ellipsis}
            onClick={() => {
              setEllipsisMenuOpen((state) => !state);
            }}
            className="cursor-pointer h-6"
          />
          {ellipsisMenuOpen && (
            <EllipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>
      </div>
    </div>
  );
}

export default TaskModal;
