import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Search.scss";
import close from "./../../assets/icons/close.png";
import search from "./../../assets/icons/search.png";
function Search() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`search ${isOpen && "active"}`}>
      <label className="search__label">
        <img
          className="search__icon-search"
          width={16}
          height={16}
          src={search}
          alt="search"
        />
        <input
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => setIsOpen(false)}
          placeholder="поиск"
          className="search__input"
          type="text"
        />
        <img
          className="search__icon-exit"
          width={16}
          height={16}
          src={close}
          alt="exit"
        />

        <div className="result">
          <h4 className="result__title">titleasdfasdf</h4>
          <ul className="result__list">
            <li className="result__item">asdfasdf</li>
            <li className="result__item">asdfasdf</li>
            <li className="result__item">asdfasdf</li>
            <li className="result__item">asdfasdf</li>
          </ul>
        </div>
      </label>
    </div>
  );
}
export default Search;
