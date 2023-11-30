import React, { useState } from "react";

type ProductType = {
  color: string[];
  description: string;
  mainCategory: string;
  name: string;
  price: string;
  size: string[];
  src: string[];
  subCategory: string;
  thumbnail: string;
  _id: string;
};

interface itemType {
  detailItem: ProductType | undefined;
}

function ItemOrder({ detailItem }: itemType) {
  const [selectColor, setSelectColor] = useState<string>("");
  const [selectSize, setSelectSize] = useState<string>("");

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
          </div>
          {/* 상품 추가하기버튼 */}
          <div className="item-btn">
            <span>추가하기</span>
          </div>
        </div>
      ) : (
        <div className="load">준비중...</div>
      )}
    </div>
  );
}

export default ItemOrder;
