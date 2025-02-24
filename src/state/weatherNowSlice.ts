import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface WeatherNow {
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
  "weatherNow/fetchWeatherNow", 
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=ru`
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
            return rejectWithValue("An unknown error occurred");
          }
    }
  }
);

// Начальное состояние
interface WeatherNowState {
  data: WeatherNow | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherNowState = {
  data: null,
  loading: false,
  error: null,
};

// Создаём slice для погодных данных
const weatherNowSlice = createSlice({
  name: "weatherNow",
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
export default weatherNowSlice.reducer;
