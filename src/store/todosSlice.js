import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const storage = localStorage;
const getDate = () => {
  let date = new Date();
  let time = `${date.getHours()}:${
    date.getMinutes() < 10 ? 0 + String(date.getMinutes()) : date.getMinutes()
  } ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  return time;
};
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    data: JSON.parse(storage.getItem("todos"))
      ? JSON.parse(storage.getItem("todos"))
      : [
          {
            name: "Делать работу",
            id: uuidv4(),
            category: "работа",
            isCompleted: false,
            description:
              "Я встаю утром, умываюсь, завтракаю, делаю сначала самое важное, а потом все остальное",
            date: getDate(),
          },
          {
            name: "Физическая культура",
            id: uuidv4(),
            category: "спорт",
            isCompleted: false,
            description:
              "Сначала я сделаю упражнения, потом приступлю к тренировкам. Я бегу 2 км.",
            date: getDate(),
          },
          {
            name: "Заниматься математикой",
            id: uuidv4(),
            category: "саморазвитие",
            isCompleted: false,
            description:
              "Я буду изучать математику, я начну изучать геометрию. я никогда не пользовался калькулятором",
            date: getDate(),
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
        date: getDate(),
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
