import React, { useEffect, useState } from "react";
import { LuAlignLeft, LuX } from "react-icons/lu";
import { useSelector } from "react-redux";
import {
  RootState,
  handlerCartShow,
  handlerMenu,
  handlerMenuActive,
  handlerSlideNum,
} from "../../Store";
import ActiveMenu from "./ActiveMenu";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cart from "../cart/Cart";
import { UserType } from "../../type/Type";

function SubMenu() {
  const [userLogin, setUserLogin] = useState<UserType>();
  const [userCartNum, setUserCartNum] = useState<string>("0");

  const menuAcitve = useSelector((state: RootState) => state.menuActive);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUserLogin(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    if (userLogin) {
      axios
        .post("/cart", { _id: userLogin._id })
        .then((res) => {
          setUserCartNum(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userLogin]);

  // 바스켓백
  const handlerCartBody = () => {
    if (userLogin) {
      dispatch(handlerCartShow(true));
      document.querySelector("body")?.classList.add("active");
    } else {
      alert("로그인 후 사용해주세요.");
      dispatch(handlerMenu("menu-subpage"));
      navigate("/login");
    }
  };

  return (
    <div className="menu sub-menu">
      {menuAcitve.active ? (
        <LuX
          className="menu-bar"
          onClick={() => {
            dispatch(handlerMenuActive(false));
          }}
        />
      ) : (
        <LuAlignLeft
          className="menu-bar"
          onClick={() => {
            dispatch(handlerMenuActive(true));
          }}
        />
      )}
      <div className="main-menu">
        {menuAcitve.active ? (
          <ActiveMenu />
        ) : (
          <>
            <h1 onClick={() => navigate("/")}>SHOP</h1>
          </>
        )}
      </div>
      <div className="menu-search" onClick={() => navigate("/search")}>
        <input type="text" name="search" placeholder="검색" />
      </div>
      <div className="client-menu">
        <ul>
          <li>
            <div className="m-menu-search" onClick={() => navigate("/search")}>
              <span>상품찾기</span>
            </div>
          </li>
          <li>
            {userLogin ? (
              <span
                onClick={() => {
                  navigate("/user");
                }}
              >
                {userLogin.name}
              </span>
            ) : (
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </span>
            )}
          </li>
          <li>
            <span
              onClick={() => {
                if (userLogin) {
                  navigate("/contact");
                } else {
                  alert("로그인 후 사용해주세요.");
                  dispatch(handlerMenu("menu-subpage"));
                  navigate("/login");
                }
              }}
            >
              문의하기
            </span>
          </li>
          <li>
            <span onClick={handlerCartBody}>바스켓백({userCartNum})</span>
            <Cart user={userLogin} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubMenu;
