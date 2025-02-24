import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Интерфейс для данных прогноза погоды по часам
interface ForecastHourlyItem {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  snow?: {
    "3h": number;
  };
}

// Интерфейс для состояния слайса
interface ForecastHourlyState {
  data: { list: ForecastHourlyItem[] } | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: ForecastHourlyState = {
  data: null,
  loading: false,
  error: null,
};

// Создаём thunk для получения прогноза по часам
export const fetchForecastHourly = createAsyncThunk(
  "forecastHourly/fetchForecastHourly",
  async ( city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=ru`
      );
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);

// Создаём slice для прогноза по часам
const forecastHourlySlice = createSlice({
  name: "forecastHourly",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastHourly.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastHourly.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecastHourly.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт редьюсера
export default forecastHourlySlice.reducer;
