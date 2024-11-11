import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinCode: "", // Retrieve from localStorage if available
};

export const pinCodeSlice = createSlice({
  name: "pinCode",
  initialState,
  reducers: {
    setPinCode: (state, action) => {
      state.pinCode = action.payload;
      localStorage.setItem("pinCode", action.payload); // Store in local storage
    },
  },
});

export const { setPinCode } = pinCodeSlice.actions;
export default pinCodeSlice.reducer;
