import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import EllipsisMenu from "../components/EllipsisMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardsSlice";
import AddEditTask from "./AddEditTask";
import { fetchSubtasksForTask, updateSubtaskCompletion } from "../utils/api";
import axios from "axios";

function TaskModal({ colIndex, taskIndex, setIsTaskModalOpen }) {
  const [newTaskName, setNewTaskName] = useState("");
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((_, i) => taskIndex === i);

  const [subtasks, setSubtasks] = useState([]);
  const [completed, setCompleted] = useState(0);

  const onDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tasks/${task.id}`);

      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));

      setIsTaskModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSubtaskCompletionChange = async (subtaskId, isCompleted) => {
    try {
      await updateSubtaskCompletion(task.id, subtaskId, isCompleted);

      const updatedSubtasks = await fetchSubtasksForTask(task.id);
      setSubtasks(updatedSubtasks);

      const completedCount = updatedSubtasks.filter(
        (subtask) => subtask.isCompleted
      ).length;
      setCompleted(completedCount);
    } catch (error) {
      console.error("Error updating subtask completion:", error);
    }
  };

  useEffect(() => {
    async function fetchSubtasks() {
      console.log("Task:", task);
      try {
        const subtasksData = await fetchSubtasksForTask(task.id);

        setSubtasks(subtasksData);
        const completedCount = subtasksData.filter(
          (subtask) => subtask.isCompleted
        ).length;
        setCompleted(completedCount);
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    }

    fetchSubtasks();
  }, [task.id]);

  const completedCount = useMemo(() => {
    return subtasks.reduce(
      (count, subtask) => count + (subtask.isCompleted ? 1 : 0),
      0
    );
  }, [subtasks]);

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
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

  {
    subtasks.map((subtask, i) => (
      <Subtask
        key={subtask.id}
        index={i}
        taskIndex={taskIndex}
        colIndex={colIndex}
        onCompletionChange={handleSubtaskCompletionChange}
      />
    ));
  }

  const handleUpdateTaskName = () => {
    if (newTaskName.trim() !== "") {
      updateTaskName(newTaskName);
    }
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
            <EllipsisMenu setOpenEditModal={setOpenEditModal} type="Task" />
          )}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completedCount} of {subtasks.length})
        </p>

        {/* Subtasks Section */}

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, i) => (
            <Subtask
              key={i}
              index={i}
              taskIndex={taskIndex}
              colIndex={colIndex}
            />
          ))}
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0
          border border-gray-300 outline-none focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] text-black dark:text-gray-500"
            value={status}
            onChange={onChange}
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white text-black bg-red-500 dark:bg-red-700 mt-2 py-2 rounded-full"
            onClick={() => onDeleteTask()}
          >
            Delete Task
          </button>
        </div>
      </div>
      {isAddTaskModalOpen && (
        <AddEditTask
          setOpenAddEditTask={setIsAddTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          taskId={task.id}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default TaskModal;
