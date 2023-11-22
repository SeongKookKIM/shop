import React, { useState } from "react";

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
  return (
    <>
      {
        [
          <ul>
            <li>
              <span>COAT</span>
            </li>
            <li>
              <span>BEST</span>
            </li>
            <li>
              <span>NEW</span>
            </li>
            <li>
              <span>LIFE</span>
            </li>
          </ul>,
          <ul>
            <li>
              <span>BEST</span>
            </li>
            <li>
              <span>NEW</span>
            </li>
            <li>
              <span>COLLECTION</span>
            </li>
          </ul>,
          <ul>
            <li>
              <span>BEST</span>
            </li>
            <li>
              <span>NEW</span>
            </li>
            <li>
              <span>COLLECTION</span>
            </li>
            <li>
              <span>CARDIGAN</span>
            </li>
          </ul>,
          <ul>
            <li>
              <span>DECO1</span>
            </li>
            <li>
              <span>DECO2</span>
            </li>
            <li>
              <span>DECO3</span>
            </li>
            <li>
              <span>DECO4</span>
            </li>
          </ul>,
        ][tab]
      }
    </>
  );
}

export default ActiveMenu;
