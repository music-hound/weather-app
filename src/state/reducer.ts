import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import weatherNowReducer from "./weatherNowSlice";
import forecastHourlyReducer from './forecastHourlySlice'
import cityReducer from "./citySlice";


// Комбинируем редьюсеры
const reducer = combineReducers({
  theme: themeReducer,
  weatherNow: weatherNowReducer,
  forecastHourly: forecastHourlyReducer,
  city: cityReducer,
});

export default reducer;
