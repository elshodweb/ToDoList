import React, { useState } from "react";
import "./Header.scss";
import menu from "./../../assets/icons/menu.png";
import home from "./../../assets/icons/home.png";
import plus from "./../../assets/icons/plus.png";
import brightness from "./../../assets/icons/brightness.png";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch } from "react-redux";
import { togleAside } from "../../store/asideSlice";
import ModalAdd from "../ModalAdd/ModalAdd";
import { Link } from "react-router-dom";

function Header() {
  const { setValTheme } = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="header">
      {isOpenModal && <ModalAdd setIsOpenModal={setIsOpenModal} />}
      <div className="header__left">
        <button
          onClick={() => dispatch(togleAside())}
          className="header-icon-btn header__menu-i"
        >
          <img width={16} height={16} src={menu} alt="menu" />
        </button>

        <Link to={""} className="header-icon-btn header__home-i">
          <img width={16} height={16} src={home} alt="home" />
        </Link>
        <div className="header__title">ToDoList</div>
      </div>
      <div className="header__right">
        <button
          onClick={() => setIsOpenModal(true)}
          className="header-icon-btn header__add"
        >
          <img width={16} height={16} src={plus} alt="add" />
        </button>
        <button
          onClick={setValTheme}
          className="header-icon-btn header__brightness"
        >
          <img width={16} height={16} src={brightness} alt="brightness" />
        </button>
      </div>
    </div>
  );
}
export default Header;
