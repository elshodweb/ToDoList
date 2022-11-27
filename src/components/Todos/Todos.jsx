import React, { useEffect } from "react";
import "./Todos.scss";
import more from "./../../assets/icons/more.png";
import Todo from "../Todo/Todo";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Todos() {
  const storage = localStorage;
  const { category } = useParams();
  const categories = useSelector((state) => state.category);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (categories.findIndex((item) => item.path === category) < 0) {
      navigateTo("/");
    }
  });

  const todos = useSelector((state) => state.todos.data);
  useEffect(() => {
    storage.setItem("todos", JSON.stringify(todos));
  }, [todos, storage]);
  return (
    <div className="todos">
      <div className="container">
        <h3 className="todos__title">
          <strong>{category}</strong>
          <button className="todos__more-btn">
            <img src={more} width="16" height={16} alt="more" />
          </button>
        </h3>
        <div className="todos__body">
          <div className="todos__border"></div>
          {todos.length > 0 &&
            todos
              .filter((item) => {
                return item.category === category;
              })
              .map((item) => <Todo key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default Todos;
