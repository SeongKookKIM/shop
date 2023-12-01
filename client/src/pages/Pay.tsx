import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cartType, userType } from "../type/Type";
import { LuArrowLeft } from "react-icons/lu";

function Pay() {
  const [itemList, setItemList] = useState<cartType[]>();
  const [itemLength, setItemLenght] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<userType>();
  console.log(itemList);
  console.log(totalPrice);
  console.log(userInfo);

  let item = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUserInfo(JSON.parse(localUser));
    }
    if (item) {
      setItemList(item.state.cartList);
      setTotalPrice(item.state.totalPrice);
      setUserInfo(item.state.user);
      setItemLenght(item.state.cartList.length);
    }
  }, []);

  return (
    <div className="pay">
      <div className="pay-inner">
        <div className="back">
          <LuArrowLeft onClick={() => navigate(-1)} />
        </div>
        <p className="delivery-title">물품을 배송 받을 장소</p>
        <div className="delivery-adress">
          <span style={{ pointerEvents: "none" }}>{userInfo?.adress}</span>
          <span style={{ pointerEvents: "none" }}>
            {userInfo?.adressdetail}
          </span>
          <span>편집</span>
        </div>
        <div className="item-list">
          <p>품목</p>
          <ul>
            {itemLength > 0 ? (
              <>
                {itemList?.map((it, i) => {
                  return (
                    <li key={i}>
                      <img src={it.image} />
                    </li>
                  );
                })}
              </>
            ) : (
              <div
                className="alert"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                상품이 존재하지 않습니다.
              </div>
            )}
          </ul>
          <div className="total-price">
            <span>
              총합:{" "}
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </span>
          </div>
        </div>
      </div>
      <div className="payment">
        <span>배송</span>
        <span>무료</span>
        <button type="button">결제하기</button>
      </div>
    </div>
  );
}

export default Pay;
