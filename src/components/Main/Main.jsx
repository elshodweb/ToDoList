import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Aside from "../Aside/Aside";
import Home from "../Home/Home";
import Todos from "../Todos/Todos";
import "./Main.scss";
function Main() {
  const asideObj = useSelector((state) => state.aside);

  return (
    <div className={`main ${asideObj.isOpen ? "full" : ""}`}>
      <Aside />
      <Routes>
        <Route path="" element={<Home />} />

        <Route path=":category" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default Main;
