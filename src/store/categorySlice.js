import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const storage = localStorage;
const categorySlice = createSlice({
  name: "category",
  initialState: JSON.parse(storage.getItem("categories"))
    ? JSON.parse(storage.getItem("categories"))
    : [
        {
          id: uuidv4(),
          name: "спорт",
          path: "спорт",
        },
        {
          id: uuidv4(),
          name: "работа",
          path: "работа",
        },
        {
          id: uuidv4(),
          name: "саморазвитие",
          path: "саморазвитие",
        },
      ],

  reducers: {
    setCategory(state, action) {
      state.push({
        id: uuidv4(),
        name: action.payload.name,
        path: action.payload.name,
      });
    },
    removeCategory(state, action) {
      let index = current(state).findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.splice(index, 1);
    },

    editCategory(state, action) {
      let index = current(state).findIndex((item) => {
        return item.id === action.payload.item.id;
      });
      state.splice(index, 1, {
        id: action.payload.item.id,
        name: action.payload.newValue,
        path: action.payload.newValue,
      });
    },
  },
});
export const { setCategory, removeCategory, editCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
