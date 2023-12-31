import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerCartShow, handlerChangeAddress } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartType, UserType } from "../../type/Type";

interface userPropsType {
  user: UserType | undefined;
}

function Cart({ user }: userPropsType) {
  const [cartList, setCartList] = useState<CartType[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartListLength, setCartListLength] = useState<number>(0);

  const showCartPage = useSelector((state: RootState) => state.showCartPage);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(
        handlerChangeAddress({
          address: user.address,
          addressDetail: user.addressdetail,
        })
      );

      axios
        .post("/cart/list", {
          _id: user._id,
        })
        .then((res) => {
          setCartList(res.data);
          setCartListLength(res.data.length);

          // 가격 총합구하기
          const itemTotalPrice = res.data.reduce(
            (total: number, item: CartType) => total + item.price * item.count,
            0
          );
          setTotalPrice(itemTotalPrice);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handlerDeleteItem = (item: CartType) => {
    if (window.confirm("해당 상품을 카트에서 삭제할까요?")) {
      axios
        .post("/cart/list/delete", item)
        .then((res) => {
          alert(res.data);

          if (user) {
            axios
              .post("/cart/list", { _id: user._id })
              .then((res) => {
                setCartList(res.data);

                // 가격 총합구하기
                const itemTotalPrice = res.data.reduce(
                  (total: number, item: CartType) =>
                    total + item.price * item.count,
                  0
                );
                setTotalPrice(itemTotalPrice);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  const handlerLinkItem = (item: CartType) => {
    let findLink = {
      name: item.name,
      price: item.price,
      thumbnail: item.image,
    };

    if (item) {
      axios
        .post("/product/link", findLink)
        .then((res) => {
          let it = res.data;
          navigate(`/detail/${it._id}`, { state: { it } });
          dispatch(handlerCartShow(false));
          document.querySelector("body")?.classList.remove("active");
        })
        .catch((err) => console.log(err));
    }
  };

  const handlerContinue = () => {
    if (cartListLength > 0) {
      dispatch(handlerCartShow(false));
      document.querySelector("body")?.classList.remove("active");
      navigate("/pay", { state: { cartList, totalPrice } });
    } else {
      alert("상품이 존재하지 않습니다.");
    }
  };

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
              {cartList && cartListLength > 0 ? (
                <>
                  {cartList.map((it, i) => {
                    return (
                      <div className="item" key={i}>
                        <div className="item-img">
                          <img
                            src={it.image}
                            onClick={() => {
                              handlerLinkItem(it);
                            }}
                          />
                        </div>
                        <div className="item-info">
                          <span
                            className="delete-btn"
                            onClick={() => {
                              handlerDeleteItem(it);
                            }}
                          >
                            ✕
                          </span>
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
                <div
                  className="load"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  cart에 상품이 존재하지 않습니다.
                </div>
              )}
            </div>
          </div>
          <div className="total">
            <div className="total-price">
              <span>합계:</span>
              <span>
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </span>
            </div>
            <button type="button" onClick={handlerContinue}>
              계속하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
