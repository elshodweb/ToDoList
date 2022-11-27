import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import asideSlice from "./asideSlice";
import todosSlice from "./todosSlice";
export default configureStore({
  reducer: {
    category: categorySlice,
    aside: asideSlice,
    todos: todosSlice,
  },
});
