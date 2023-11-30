import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerCartShow } from "../../Store";
import axios from "axios";

type userType = {
  adress: string;
  adressdetail: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  _id: string;
};

type cartType = {
  color: string;
  image: string;
  name: string;
  price: number;
  size: string;
  user: string;
  _id: string;
  count: number;
};

interface userPropsType {
  user: userType | undefined;
}

function Cart({ user }: userPropsType) {
  const [cartList, setCartList] = useState<cartType[]>();

  const showCartPage = useSelector((state: RootState) => state.showCartPage);

  let dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:8080/cart/list", { _id: user._id })
        .then((res) => {
          setCartList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <>
      {showCartPage.show && (
        <div className="cart">
          <div className="close-btn">
            <span
              onClick={() => {
                document.querySelector("body")?.classList.remove("active");
                dispatch(handlerCartShow(false));
              }}
            >
              ✕
            </span>
          </div>
          <div className="cart-inner">
            <div className="cart-list">
              {cartList?.length !== undefined ? (
                <>
                  {cartList.map((it, i) => {
                    return (
                      <div className="item" key={i}>
                        <div className="item-img">
                          <img src={it.image} />
                        </div>
                        <div className="item-info">
                          <p className="name">{it.name}</p>
                          <span className="price">
                            {it.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </span>
                          <div className="item-detail">
                            <span>{it.size}</span> <span>|</span>{" "}
                            <span>{it.color}</span>
                          </div>
                          <div className="count">
                            <span>-</span>
                            <span style={{ pointerEvents: "none" }}>
                              {it.count}
                            </span>
                            <span>+</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="load">로딩중...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
