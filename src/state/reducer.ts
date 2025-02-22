import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import weatherReducer from "./weatherSlice";
import cityReducer from "./citySlice";

// Комбинируем редьюсеры
const reducer = combineReducers({
  theme: themeReducer,
  weather: weatherReducer,
  city: cityReducer,
});

export default reducer;
