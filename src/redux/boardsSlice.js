import { createSlice } from "@reduxjs/toolkit";
import boardData from "../data/data";

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardData.boards,
  reducers: {},
});

export default boardsSlice;
