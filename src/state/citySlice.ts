import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CityState {
//     name: string;
// }

// const initialState: CityState = {
//     name: 'ufa',
// };

const citySlice = createSlice({
  name: "city",
  initialState: { name : 'ufa' },
  reducers: {
    cityChange(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { cityChange } = citySlice.actions;
export default citySlice.reducer;
