import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  activeBoard: -1,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const newState = [...state];
      const isActive = newState.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        id: payload.id,
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      newState.push(board);
      return newState;
    },

    updateColumnsAndTasks: (state, action) => {
      const { index, columnsAndTasksData } = action.payload;
      state[index].columns = columnsAndTasksData;
    },

    editBoard: (state, action) => {
      const { boardId, name, newColumns } = action.payload;

      const activeBoardIndex = state.findIndex((board) => board.isActive);

      if (activeBoardIndex !== -1) {
        const updatedActiveBoard = {
          ...state[activeBoardIndex],
          boardId,
          name: name,
          columns: newColumns,
        };

        state[activeBoardIndex] = updatedActiveBoard;
      }
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
        id,
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;

      state.forEach((board) => {
        if (board.isActive) {
          const col = board.columns[prevColIndex];
          const task = col.tasks[taskIndex];

          task.title = title;
          task.status = status;
          task.description = description;
          task.subtasks = subtasks;

          if (prevColIndex !== newColIndex) {
            col.tasks.splice(taskIndex, 1);
            const newCol = board.columns[newColIndex];
            newCol.tasks.push(task);
          }
        }
      });
    },

    setBoards: (state, action) => {
      return action.payload;
    },

    setSubtaskCompleted: (state, action) => {
      const { colIndex, taskIndex, subtaskIndex } = action.payload;

      const activeBoard = state.find((board) => board.isActive);

      if (activeBoard) {
        const column = activeBoard.columns[colIndex];

        if (column) {
          const task = column.tasks[taskIndex];

          if (task && task.subtasks) {
            const subtask = task.subtasks[subtaskIndex];

            if (subtask) {
              subtask.isCompleted = !subtask.isCompleted;
            }
          }
        }
      }
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
      column.tasks[taskIndex].subtasks = [];
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
