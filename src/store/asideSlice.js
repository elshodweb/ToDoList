import { createSlice } from "@reduxjs/toolkit";
const storage = localStorage;

const asideSlice = createSlice({
  name: "aside",
  initialState: JSON.parse(storage.getItem("isAsideOpen"))
    ? JSON.parse(storage.getItem("isAsideOpen"))
    : {
        isOpen: true,
      },
  reducers: {
    togleAside(state) {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { togleAside } = asideSlice.actions;
export default asideSlice.reducer;
