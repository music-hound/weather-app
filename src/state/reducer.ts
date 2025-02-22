import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import weatherReducer from "./weatherSlice";

// Комбинируем редьюсеры
const reducer = combineReducers({
  theme: themeReducer,
  weather: weatherReducer,
});

export default reducer;
