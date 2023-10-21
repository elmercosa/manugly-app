import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    value: 1234,
  },
  reducers: {
    setBusiness: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBusiness } = businessSlice.actions;

export default businessSlice.reducer;
