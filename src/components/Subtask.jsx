import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { setSubtaskCompleted } from "../redux/boardsSlice";
import axios from "axios";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtask = task.subtasks && task.subtasks[index];

  if (!subtask) {
    return null;
  }

  const checked = subtask.isCompleted;

  const onDivClick = async () => {
    try {
      const updatedSubtaskData = {
        isCompleted: !checked,
      };

      await axios.patch(
        `http://localhost:8000/api/v1/subtasks/${subtask.id}`,
        updatedSubtaskData
      );

      dispatch(
        setSubtaskCompleted({ colIndex, taskIndex, subtaskIndex: index })
      );
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  return (
    <div
      className={`w-full flex hover:bg-[#d8c648] dark:hover:bg-[#33c6d8] rounded-md
      relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[f4f7fd] cursor-pointer`}
      onClick={onDivClick}
    >
      <input
        type="checkbox"
        className="w-4 h-4 accent-blue-500 cursor-pointer"
        checked={checked}
        onChange={() => {}}
      />
      <p className={`${checked ? "line-through  text-gray-600" : ""}`}>
        {subtask.title}
      </p>
    </div>
  );
}
export default Subtask;
