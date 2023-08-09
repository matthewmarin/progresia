import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function AddEditTask({
  type,
  device,
  setOpenAddEditTask,
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
  }, [col, taskIndex, type, columns, prevColIndex]);

  const onChange = (id, newValue) => {
    setSubtasks((pervState) => {
      const newState = [...pervState];
      const subtasks = newState.find((subtasks) => subtasks.id === id);
      subtasks.title = newValue;
      return newState;
    });
  };

  const onchangeStatus = (e) => {
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

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
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
          {subtasks.map((subtasks, index) => (
            <div key={index} className="flex items-center w-full">
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
            onChange={(e) => onchangeStatus(e)}
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0
          border border-gray-300 outline-none focus:outline-[#d8c648] dark:focus:outline-[#33c6d8] text-black dark:text-gray-100 "
          >
            {columns.map((columns, index) => (
              <option className="text-black " value={columns.name} key={index}>
                {columns.name}
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
