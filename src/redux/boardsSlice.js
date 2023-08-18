import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const newState = [...state];
      const isActive = newState.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      newState.push(board);

      return newState;
    },
    editBoard: (state, action) => {
      const newState = [...state];
      const payload = action.payload;
      const boardIndex = newState.findIndex((board) => board.isActive);
      newState[boardIndex] = {
        name: payload.name,
        columns: payload.newColumns,
        isActive: newState[boardIndex].isActive,
      };

      return newState;
    },
    deleteBoard: (state) => {
      const newState = [...state];
      const board = newState.find((board) => board.isActive);
      newState.splice(newState.indexOf(board), 1);
      return newState;
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const activeBoard = state.find((board) => board.isActive);
      const column = activeBoard.columns.find(
        (col, index) => index === newColIndex
      );
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;

      const updatedTask = {
        title,
        status,
        description,
        subtasks,
      };

      state.forEach((board) => {
        if (board.isActive) {
          board.columns.forEach((col, index) => {
            if (index === prevColIndex) {
              col.tasks[taskIndex] = updatedTask;
            } else if (index === newColIndex) {
              col.tasks.push(updatedTask);
            }
          });
        }
      });
    },

    setBoards: (state, action) => {
      return action.payload; // Assuming payload is an array of boards
    },

    setSubtaskCompleted: (state, action) => {
      const { colIndex, taskIndex, subtaskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns[colIndex];
      const task = column.tasks[taskIndex];
      const subtask = task.subtasks[subtaskIndex];
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const { colIndex, taskIndex, newColIndex, status } = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns[colIndex];
      const task = col.tasks[taskIndex];

      if (colIndex === newColIndex) {
        task.status = status;
      } else {
        col.tasks.splice(taskIndex, 1);
        const newCol = columns[newColIndex];
        newCol.tasks.push(task);
      }
    },
    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns[colIndex];
      column.tasks.splice(taskIndex, 1);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns[prevColIndex];

      if (prevCol && board.columns[colIndex]) {
        const task = prevCol.tasks.splice(taskIndex, 1)[0];
        board.columns[colIndex].tasks.push(task);
      }
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
  dragTask,
  setBoards,
} = boardsSlice.actions;

export default boardsSlice;
