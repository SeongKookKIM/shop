import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { handlerMenu, handlerMenuActive } from "../../Store";

function ActiveMenu() {
  const [menuSelect, setMenuSelect] = useState<string>("ALL");
  const [tab, setTab] = useState<number>(0);

  const handleMenuClick = (selectedMenu: string) => {
    setMenuSelect(selectedMenu);
  };

  return (
    <div className="show-menu">
      <h1>SHOP</h1>
      <ul className="show-menu-list">
        <li>
          <p
            className={menuSelect === "ALL" ? "select" : ""}
            onClick={() => {
              handleMenuClick("ALL");
              setTab(0);
            }}
          >
            ALL
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "MEN" ? "select" : ""}
            onClick={() => {
              handleMenuClick("MEN");
              setTab(1);
            }}
          >
            MEN
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "WOMEN" ? "select" : ""}
            onClick={() => {
              handleMenuClick("WOMEN");
              setTab(2);
            }}
          >
            WOMEN
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "HOME" ? "select" : ""}
            onClick={() => {
              handleMenuClick("HOME");
              setTab(3);
            }}
          >
            HOME
          </p>
        </li>
      </ul>
      <div className="sub-menu-list">
        <TabMenuList tab={tab} />
      </div>
    </div>
  );
}

interface tabProps {
  tab: number;
}

function TabMenuList({ tab }: tabProps) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  return (
    <>
      {
        [
          <ul>
            <li>
              <span
                onClick={() => {
                  navigate("/product/all/coat");
                  dispatch(handlerMenuActive(false));
                }}
              >
                COAT
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/all/best");
                  dispatch(handlerMenuActive(false));
                }}
              >
                BEST
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/all/new");
                  dispatch(handlerMenuActive(false));
                }}
              >
                NEW
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/all/life");
                  dispatch(handlerMenuActive(false));
                }}
              >
                LIFE
              </span>
            </li>
          </ul>,
          <ul>
            <li>
              <span
                onClick={() => {
                  navigate("/product/men/best");
                  dispatch(handlerMenuActive(false));
                }}
              >
                BEST
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/men/new");
                  dispatch(handlerMenuActive(false));
                }}
              >
                NEW
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/men/collection");
                  dispatch(handlerMenuActive(false));
                }}
              >
                COLLECTION
              </span>
            </li>
          </ul>,
          <ul>
            <li>
              <span
                onClick={() => {
                  navigate("/product/women/best");
                  dispatch(handlerMenuActive(false));
                }}
              >
                BEST
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/women/new");
                  dispatch(handlerMenuActive(false));
                }}
              >
                NEW
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/product/women/collection");
                  dispatch(handlerMenuActive(false));
                }}
              >
                COLLECTION
              </span>
            </li>
          </ul>,
          <ul>
            <li>
              <span
                onClick={() => {
                  navigate("/product/home/deco");
                  dispatch(handlerMenuActive(false));
                }}
              >
                DECO
              </span>
            </li>
          </ul>,
        ][tab]
      }
    </>
  );
}

export default ActiveMenu;
