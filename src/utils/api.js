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
