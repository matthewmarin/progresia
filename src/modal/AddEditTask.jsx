import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import boardsSlice, { editTask, addTask } from "../redux/boardsSlice";
import { fetchBoards } from "../utils/api";
import axios from "axios";

function AddEditTask({
  type,
  device,
  setOpenAddEditTask,
  taskId,
  setIsTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState("true");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  useEffect(() => {
    if (type === "edit" && col) {
      const task = col.tasks.find((task, index) => index === taskIndex);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(columns[prevColIndex]?.name || "");
        setSubtasks(
          task.subtasks.map((subtask) => ({
            ...subtask,
            id: uuidv4(),
          }))
        );
      }
    }
  }, [col, taskIndex, type, columns, prevColIndex, taskId]);

  const onChange = (id, newValue) => {
    setSubtasks((pervState) => {
      const newState = [...pervState];
      const subtasks = newState.find((subtasks) => subtasks.id === id);
      console.log(subtasks);
      subtasks.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDelete = (id) => {
    setSubtasks((perState) => perState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      const taskData = {
        title,
        description,
        subtasks,
        status,
        newColIndex,
      };

      if (type === "edit") {
        dispatch(
          editTask({
            id: task.id,
            title,
            description,
            subtasks,
            status,
            prevColIndex,
            newColIndex,
            taskIndex,
          })
        );
      } else {
        dispatch(addTask(taskData));
      }

      try {
        if (type === "edit") {
          await axios.patch(
            `http://localhost:8000/api/v1/tasks/${task.id}`,
            taskData
          );
        } else {
          await axios.post("http://localhost:8000/api/v1/tasks", taskData);
        }
        setTitle("");
        setDescription("");
        setSubtasks([
          { title: "", isCompleted: false, id: "" },
          { title: "", isCompleted: false, id: "" },
        ]);
        setStatus("");
        setNewColIndex(0);
        setOpenAddEditTask(false);
      } catch (error) {
        console.error("Error creating/editing task:", error);
      }
    }
  };

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
        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-4 py-2 outline-none min-h-[200px] focus:border-0 rounded-md text-sm
          border border-gray-600 focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] ring-0"
            type="text"
            placeholder="Taking a 1-hour lunch break for relaxation, nourishment, and recharging during the workday."
          />
        </div>
        {/* Subtask Section */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div key={subtask.id} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  onChange(subtasks.id, e.target.value);
                }}
                type="text"
                value={subtasks.title}
                className="bg-transparent outline-none focus:border-0
                        flex-grow px-4 py-2 rounded-md text-sm border border-gray-600
                        focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] ring-0"
                placeholder="e.g Take a lunch break"
              />
              <RxCross1
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(subtasks.id);
                }}
              />
            </div>
          ))}

          <button
            className="w-full items-center hover:opacity-75 text-white dark:text-black
            dark:bg-white bg-[#2b2c37] mt-2 py-2 rounded-full"
            onClick={() => {
              setSubtasks((prevState) => [
                ...prevState,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            +Add New Subtask
          </button>
        </div>
        {/* Current Status */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            {" "}
            Current Status
          </label>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e)}
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0
          border border-gray-300 outline-none focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] text-black dark:text-gray-100 "
          >
            {columns.map((column, index) => (
              <option className="text-black " value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white
            text-black bg-[#d8c648] dark:bg-[#33c6d8] mt-2 py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTask;
