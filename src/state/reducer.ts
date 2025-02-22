import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

// Комбинируем редьюсеры
const reducer = combineReducers({
  theme: themeReducer,
});

export default reducer;
