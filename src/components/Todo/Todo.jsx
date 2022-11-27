import more from "./../../assets/icons/more.png";
import edit from "./../../assets/icons/edit.png";
import trash from "./../../assets/icons/trash.png";
import check from "./../../assets/icons/check.png";
import React, { useState } from "react";
import "./Todo.scss";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, removeTodo, todoComlated } from "../../store/todosSlice";
function Todo({ item }) {
  const [isOpenMore, setiIsOpenMore] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    ...item,
  });
  const categories = useSelector((state) => state.category);
  const openMore = () => {
    setiIsOpenMore(true);
    const removeEvent = (e) => {
      if (!e.target.closest(".more")) {
        setiIsOpenMore(false);
        document.body.removeEventListener("click", addEvent, true);
      }
    };
    const addEvent = (e) => {
      removeEvent(e);
    };
    document.body.addEventListener("click", addEvent, true);
  };
  const editTodoValue = (id) => {
    setIsInputOpen(false);
    dispatch(editTodo({ ...values }));
  };
  const removeTodoValue = (id) => {
    dispatch(removeTodo({ id }));
    setiIsOpenMore(false);
  };
  const thisCompleted = (id) => {
    dispatch(todoComlated({ id }));
  };
  return (
    <div className="todo">
      {isInputOpen ? (
        <>
          <div className="todo__top">
            <div className="todo__left left-edit">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editTodoValue(item.id);
                  }
                }}
                defaultValue={values.name}
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                }}
                type="text"
                className="todo__edit-input"
              />
            </div>
            <div className="todo__right right-edit">
              <select
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editTodoValue(item.id);
                  }
                }}
                value={values.category}
                onChange={(e) => {
                  setValues({ ...values, category: e.target.value });
                }}
                className="todo__edit-select"
              >
                {categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <button
                onClick={() => editTodoValue(item.id)}
                className="todo__btn todo__edit-btn"
              >
                <img width={18} height={18} src={check} alt="check" />
              </button>
            </div>
          </div>
          <div className="todo__bottom">
            <textarea
              defaultValue={values.description}
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              type="text"
              className="todo__edit-textarea"
            ></textarea>
          </div>
        </>
      ) : (
        <>
          <div className="todo__top">
            <div className="todo__left">
              <input
                type="checkbox"
                defaultChecked={item.isCompleted}
                onChange={() => thisCompleted(item.id)}
              />
              <div className="todo__name">{item.name}</div>
            </div>
            <div className="todo__right">
              <div className="todo__category">{item.category}</div>
              <button onClick={openMore} className="todo__btn">
                <img width={18} height={18} src={more} alt="more" />
              </button>
              <div className={`more ${isOpenMore ? "open" : ""}`}>
                <button
                  onClick={() => setIsInputOpen(true)}
                  className="todo__btn more__btn"
                >
                  <img width={18} height={18} src={edit} alt="edit" />
                </button>
                <button
                  onClick={() => removeTodoValue(item.id)}
                  className="todo__btn more__btn"
                >
                  <img width={18} height={18} src={trash} alt="trash" />
                </button>
              </div>
            </div>
          </div>
          <div className="todo__bottom">
            <div>{item.description}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Todo;
