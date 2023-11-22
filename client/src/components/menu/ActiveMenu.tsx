import React, { useState } from "react";

function ActiveMenu() {
  const [menuSelect, setMenuSelect] = useState<string>("ALL");

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
            onClick={() => handleMenuClick("ALL")}
          >
            ALL
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "MEN" ? "select" : ""}
            onClick={() => handleMenuClick("MEN")}
          >
            MEN
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "WOMEN" ? "select" : ""}
            onClick={() => handleMenuClick("WOMEN")}
          >
            WOMEN
          </p>
        </li>
        <li>
          <p
            className={menuSelect === "HOME" ? "select" : ""}
            onClick={() => handleMenuClick("HOME")}
          >
            HOME
          </p>
        </li>
      </ul>
      <div className="sub-menu-list">
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
        </ul>
      </div>
    </div>
  );
}

export default ActiveMenu;
