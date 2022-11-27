import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/todosSlice";
import "./ModalAdd.scss";
function ModalAdd({ setIsOpenModal }) {
  const categories = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    category: categories[0].name,
    description: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addTodo(data));
    console.log(data);
    setIsOpenModal(false);
  };
  return createPortal(
    <div
      onClick={(e) => {
        if (e.target.classList.contains("modal")) {
          setIsOpenModal();
        }
      }}
      className="modal asdf asfd asdf"
    >
      <form onSubmit={(e) => submitForm(e)} className="modal__content">
        <div className="modal__input">
          <input
            required
            minLength={8}
            value={data.name}
            onChange={(e) => {
              setData({
                ...data,
                name: e.target.value,
              });
            }}
            type="text"
            placeholder="что вы планируете ?"
          />
        </div>
        <textarea
          required
          minLength={10}
          defaultValue={data.description}
          onChange={(e) => {
            setData({
              ...data,
              description: e.target.value,
            });
          }}
          className={"modal__textarea"}
          cols="30"
          rows="10"
        ></textarea>
        <select
          defaultValue={data.category}
          onChange={(e) => {
            setData({
              ...data,
              category: e.target.value,
            });
          }}
          className="modal__select"
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
        <div className="modal__btn">
          <button onClick={() => setIsOpenModal()} type="button">
            Отменить
          </button>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export default ModalAdd;
