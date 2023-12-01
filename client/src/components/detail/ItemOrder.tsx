import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProductType, userType } from "../../type/Type";

interface itemType {
  detailItem: ProductType | undefined;
}

function ItemOrder({ detailItem }: itemType) {
  const [selectColor, setSelectColor] = useState<string>("");
  const [selectSize, setSelectSize] = useState<string>("");
  const [user, setUser] = useState<userType | null>();
  const [itemCount, setItemCount] = useState<number>(1);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");

    if (userLocal !== null) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  // 추가하기 버튼
  const handlerAddItem = () => {
    if (selectColor === "") {
      alert("색상옵션을 선택해주세요");
    } else if (selectSize === "") {
      alert("사이즈옵션을 선택해주세요.");
    } else if (detailItem && user) {
      let addPost = {
        user: user._id,
        name: detailItem.name,
        price: detailItem.price,
        image: detailItem.thumbnail,
        color: selectColor,
        size: selectSize,
        count: itemCount,
      };

      axios
        .post("http://localhost:8080/product/add", addPost)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="item-order">
      {detailItem ? (
        <div className="item-order-inner">
          {/* 상품 인포 */}
          <div className="item-info">
            <div className="name-price">
              <p>{detailItem.name}</p>
              <span>
                {detailItem.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                원
              </span>
            </div>
            <div className="description">
              <span className="item-description">{detailItem.description}</span>
            </div>
            <div className="delivery">
              <span>배송, 교환 및 반품</span>
            </div>
          </div>
          {/* 상품 선택 */}
          <div className="selected">
            <div className="color">
              {detailItem.color.map((color, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      setSelectColor(color);
                    }}
                    className={selectColor === color ? "select" : ""}
                  >
                    {color}
                  </span>
                );
              })}
            </div>
            <div className="size">
              {detailItem.size.map((size, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      setSelectSize(size);
                    }}
                    className={selectSize === size ? "select" : ""}
                  >
                    {size}
                  </span>
                );
              })}
            </div>
            <div className="item-count">
              <span onClick={() => setItemCount(itemCount - 1)}>-</span>
              <span style={{ pointerEvents: "none" }}>{itemCount}</span>
              <span onClick={() => setItemCount(itemCount + 1)}>+</span>
            </div>
          </div>

          {/* 상품 추가하기버튼 */}
          <div className="item-btn">
            <span onClick={handlerAddItem}>추가하기</span>
          </div>
        </div>
      ) : (
        <div className="load">준비중...</div>
      )}
    </div>
  );
}

export default ItemOrder;
