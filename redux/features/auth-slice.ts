import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const auth = createSlice({
  name: "auth",
  initialState: {
    bearer: null,
  },
  reducers: {
    setBearer: (state, action: PayloadAction<any>) => {
      state.bearer = action.payload;
    },
  },
});

export const { setBearer } = auth.actions;
export default auth.reducer;
