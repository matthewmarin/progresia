import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import EllipsisMenu from "../components/EllipsisMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "./DeleteModal";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setEllipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setEllipsisMenuOpen(false);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      onClick={onClose}
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

        {/* Subtasks Section */}

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, i) => {
            return (
              <Subtask
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0
          border border-gray-300 outline-none focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] text-black dark:text-gray-100"
            value={status}
            onChange={onChange}
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type="task"
        />
      )}
    </div>
  );
}

export default TaskModal;
