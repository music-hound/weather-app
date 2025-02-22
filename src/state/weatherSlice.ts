import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getURL } from "../api";

interface Weather {
    coord: {
      lon: string;
      lat: string;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
    snow?: {
      "1h": number;
    };
  }

// Создаём thunk для получения данных о погоде
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather", 
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(getURL("weather", city));
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      const data = await response.json();
      return data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
          } else {
            return rejectWithValue("An unknown error occurred");
          }
    }
  }
);

// Начальное состояние
interface WeatherState {
  data: Weather | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

// Создаём slice для погодных данных
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт редьюсера
export default weatherSlice.reducer;
