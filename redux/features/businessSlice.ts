import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business: null,
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    updateBusiness: (state, action) => {
      const newBusiness = action.payload;
      state.business = newBusiness;
      console.log("newBusiness :>> ");
    },
  },
});

export const { updateBusiness } = businessSlice.actions;
export default businessSlice.reducer;
