import React, { useEffect, useState } from "react";
import "./Aside.scss";
import plus from "./../../assets/icons/plus.png";
import trash from "./../../assets/icons/trash.png";
import down from "./../../assets/icons/down.png";
import check from "./../../assets/icons/check.png";
import edit from "./../../assets/icons/edit.png";
import close from "./../../assets/icons/close.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editCategory,
  removeCategory,
  setCategory,
} from "./../../store/categorySlice";
import { togleAside } from "../../store/asideSlice";
function Aside() {
  const storage = localStorage;
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const asideObj = useSelector((state) => state.aside);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCategoryList, serIsOpenCategoryList] = useState(true);
  const [valCategory, setValCategory] = useState("");
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");
  const windowInnerWidth = window.innerWidth;
  useEffect(() => {
    if (windowInnerWidth < 750) {
      let div = document.querySelector(".todos")
        ? document.querySelector(".todos")
        : document.querySelector(".home");
      const removeEvent = () => {
        div.removeEventListener("click", addEvent, true);
      };
      const addEvent = () => {
        dispatch(togleAside());
        removeEvent();
      };
      if (asideObj.isOpen) {
        div.addEventListener("click", addEvent, true);
      }
    }
  });
  useEffect(() => {
    storage.setItem("isAsideOpen", JSON.stringify(asideObj));
  }, [asideObj, storage]);
  const addCategory = () => {
    let index = categories.findIndex((item) => item.name === valCategory);

    if (index < 0 && valCategory) {
      dispatch(setCategory({ name: valCategory }));
      setValCategory("");
    } else {
      if (valCategory) {
        console.log("bunday kategoriya bor");
      } else {
        console.log("hech narsa kiritmadiz");
      }
    }
  };
  const editNameCategory = (e, item) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(
      editCategory({
        item: item,
        newValue: editValue,
      })
    );
    setEditId("");
  };
  useEffect(() => {
    storage.setItem("categories", JSON.stringify(categories));
  }, [categories, storage]);
  const addEditCategory = (item) => {
    setEditId(item.id);
    setEditValue(item.name);
  };
  return (
    <div className={`aside ${asideObj.isOpen ? "open" : ""}`}>
      <h4 className="aside__hover aside__title">
        <strong>Проекты</strong>
        <button
          onClick={() => {
            setIsOpenModal(!isOpenModal);
            setValCategory("");
          }}
          className={`aside__icon aside__icon-plus ${
            isOpenModal ? "open" : ""
          }`}
        >
          <img src={plus} alt="plus" />
        </button>
        <button
          onClick={() => {
            serIsOpenCategoryList(!isOpenCategoryList);
          }}
          className={`aside__icon ${isOpenCategoryList ? "active" : ""}`}
        >
          <img src={down} alt="down" />
        </button>
      </h4>

      {isOpenModal && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCategory();
          }}
          className="add-category"
        >
          <input
            required
            autoFocus
            className="add-category__input"
            type="text"
            placeholder="New category"
            value={valCategory}
            onChange={(e) => setValCategory(e.target.value)}
          />
          <button className="add-category__btn">
            <img src={check} alt="check" />
          </button>
        </form>
      )}
      <div className={`categ ${isOpenCategoryList && "open"}`}>
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <div key={item.id} className="categ__link">
                {editId === item.id ? (
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        editNameCategory(e, item);
                      }
                    }}
                    autoFocus
                    value={editValue}
                    className={"categ__edit"}
                    onChange={(e) => setEditValue(e.target.value)}
                    type={"text"}
                  />
                ) : (
                  <Link to={item.path}>{item.name}</Link>
                )}
                {editId === item.id ? (
                  <div className="categ__btns">
                    <button
                      onClick={() => {
                        editNameCategory(false, item);
                      }}
                      type="submit"
                      className="categ__link-btn"
                    >
                      <img width={18} height={18} src={check} alt="check" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditId("")}
                      className="categ__link-btn"
                    >
                      <img width={18} height={18} src={close} alt="close" />
                    </button>
                  </div>
                ) : (
                  <div className="categ__btns">
                    <button
                      onClick={() => addEditCategory(item)}
                      className="categ__link-btn"
                    >
                      <img width={18} height={18} src={edit} alt="edit" />
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          removeCategory({
                            id: item.id,
                          })
                        )
                      }
                      className="categ__link-btn"
                    >
                      <img width={18} height={18} src={trash} alt="del" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Aside;
