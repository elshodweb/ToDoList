import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const storage = localStorage;

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    data: JSON.parse(storage.getItem("todos"))
      ? JSON.parse(storage.getItem("todos"))
      : [
          {
            name: "делать упражнения",
            id: uuidv4(),
            category: "sport",
            isCompleted: false,
            description:
              "каждое утор делать упражнение каждое утор делать упражнение каждое утор делать упражнение каждое утор делать упражнение каждое утор делать упражнение",
          },
        ],
  },
  reducers: {
    addTodo(state, action) {
      state.data.push({
        name: action.payload.name,
        id: uuidv4(),
        category: action.payload.category,
        isCompleted: false,
        description: action.payload.description,
      });
    },
    removeTodo(state, action) {
      let index = current(state.data).findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.data.splice(index, 1);
    },
    editTodo(state, action) {
      let index = current(state).data.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.data.splice(index, 1, {
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        description: action.payload.description,
        isCompleted: action.payload.isCompleted,
      });
    },
    todoComlated(state, action) {
      let index = current(state).data.findIndex((item) => {
        return item.id === action.payload.id;
      });
      console.log(current(state).data[index]);
      state.data.splice(index, 1, {
        ...current(state).data[index],
        isCompleted: !current(state).data[index].isCompleted,
      });
    },
  },
});
export const { addTodo, removeTodo, editTodo, todoComlated } =
  todosSlice.actions;
export default todosSlice.reducer;
