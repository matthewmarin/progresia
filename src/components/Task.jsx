import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modal/TaskModal";

function Task({ taskIndex, colIndex }) {
  const board = useSelector((state) => {
    const activeBoard = state.boards.find((board) => board.isActive);
    return activeBoard || {}; // Use an empty object as a fallback
  });

  const col = board.columns?.[colIndex]; // Use optional chaining to avoid errors

  if (!col) {
    return null; // Handle the case where the column is undefined
  }

  const task = col.tasks?.[taskIndex]; // Use optional chaining to avoid errors

  if (!task) {
    return null; // Handle the case where the task is undefined
  }

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const completedSubtasks =
    task.subtasks?.filter((subtask) => subtask.isCompleted) || [];
  const totalSubtasks = task.subtasks?.length || 0;

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onDragStart={handleOnDrag}
        draggable
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className="w-[280px]  first:my-5 rounded-lg bg-white dark:bg-[#2b2c37]
      shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#d8c648] dark:text-white dark:hover:text-[#33c6d8] cursor-pointer"
      >
        <p className="font-bold text-xl tracking-wide">{task.title}</p>
        <p className="font-bold text-md tracking-tighter mt-8 text-gray-500">
          {completedSubtasks.length} of {totalSubtasks} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
