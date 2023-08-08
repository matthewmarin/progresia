import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";

const rootReducer = combineReducers({
  boards: boardsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
