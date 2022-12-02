import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.scss";
function Home() {
  const categories = useSelector((state) => state.category);
  return (
    <div className="home">
      <div className="home__container">
        <h2 className="home__title">
          Добро пожаловать в Todolist!!! Неважно, управляете ли вы проектом или
          выполняете рутину, – Todolist поможет в любом случае.{" "}
        </h2>

        <div className="home__body">
          {categories.length > 0 ? (
            <div className="home__nav">
              <h4 className="todo__subtitle">
                Вы можете выбрать один из них :
              </h4>
              <ul className="home__categories">
                {categories.map((item) => (
                  <li key={item.id}>
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>

              <p className="todo__subtitle">
                Или вы можете создать свои собственные категории и график дня
              </p>
            </div>
          ) : (
            <div className="home__empty">
              Вы можете добавить новые категории и задачи...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
