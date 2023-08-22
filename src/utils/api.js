import axios from "axios";
import { setBoards } from "../redux/boardsSlice";

export const fetchBoards = async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/boards");
    const boardsData = response.data.data;
    dispatch(setBoards(boardsData));
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

export const fetchColumnsAndTasks = async (boardId) => {
  console.log("fetchColumnsAndTasks", boardId);
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/boards/${boardId}`
    );
    console.log(response.data.data);
    const columnsAndTasksData = response.data.data.columns;
    return columnsAndTasksData;
  } catch (error) {
    console.error("Error fetching columns and tasks:", error);
    return null;
  }
};

export const fetchSubtasksForTask = async (taskId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/tasks/${taskId}`
    );
    const taskData = response.data.data;
    return taskData.subtasks || [];
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    return [];
  }
};

export const updateSubtaskCompletion = async (
  taskId,
  subtaskId,
  isCompleted
) => {
  try {
    await axios.patch(
      `http://localhost:8000/api/v1/tasks/${taskId}/subtasks/${subtaskId}`,
      {
        isCompleted: isCompleted,
      }
    );
  } catch (error) {
    console.error("Error updating subtask completion:", error);
    throw error;
  }
};

export default {
  fetchBoards,
  fetchColumnsAndTasks,
  fetchSubtasksForTask,
  updateSubtaskCompletion,
};
