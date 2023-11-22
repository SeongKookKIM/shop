import React, { useState } from "react";
import { LuAlignLeft, LuX } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState, handlerSlideNum } from "../../Store";
import ActiveMenu from "./ActiveMenu";

import { useDispatch } from "react-redux";

function Menu() {
  const [activeBar, setActiveBar] = useState<boolean>(false);

  const menuClass = useSelector((state: RootState) => state.menuClass);

  let dispatch = useDispatch();

  return (
    <div className={menuClass.menuClass}>
      {activeBar ? (
        <LuX
          className="menu-bar"
          onClick={() => {
            setActiveBar(false);
          }}
        />
      ) : (
        <LuAlignLeft
          className="menu-bar"
          onClick={() => {
            setActiveBar(true);
          }}
        />
      )}
      <div className="main-menu">
        {activeBar ? (
          <ActiveMenu />
        ) : (
          <>
            {" "}
            <h1>SHOP</h1>
            <nav className="menu-list">
              <ul className="gnb">
                <li>
                  <p
                    onClick={() => {
                      dispatch(handlerSlideNum(0));
                    }}
                  >
                    ALL
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => {
                      dispatch(handlerSlideNum(1));
                    }}
                  >
                    MEN
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => {
                      dispatch(handlerSlideNum(2));
                    }}
                  >
                    WOMEN
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => {
                      dispatch(handlerSlideNum(3));
                    }}
                  >
                    HOME
                  </p>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
      <div className="search">
        <input type="text" name="search" placeholder="검색" />
      </div>
      <div className="client-menu">
        <ul>
          <li>
            <span>로그인</span>
          </li>
          <li>
            <span>도움말</span>
          </li>
          <li>
            <span>장바구니(0)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;