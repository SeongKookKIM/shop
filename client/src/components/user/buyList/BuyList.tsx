import React, { useEffect, useState } from "react";
import { CartType, ProductBuyListType, UserType } from "../../../type/Type";
import axios from "axios";

import { LuCheck } from "react-icons/lu";

interface UserPropsType {
  user: UserType | undefined;
}

function BuyList({ user }: UserPropsType) {
  const [buyList, setBuyList] = useState<ProductBuyListType[] | undefined>();
  const [buyItemList, setBuyItemList] = useState<CartType[]>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/product/buylist", { _id: user?._id })
      .then((res) => {
        setBuyList(res.data);

        // 구매상품 리스트 배열만듬
        const items = res.data.map((obj: any) => obj.item).flat();
        setBuyItemList(items);
      })
      .catch((err) => console.log(err));
  }, []);

  //   반품 리스트 배열에 넣기
  const handleItemClick = (item: any) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((id) => id !== item)
        : [...prevSelectedItems, item]
    );
  };
  // 기존 주문 리스트에서 반품리스트 빼기
  const handleReturn = (idx: number) => {
    const updatedBuyItemList = buyItemList?.filter(
      (item: any) => !selectedItems.includes(item)
    );
    setBuyItemList(updatedBuyItemList);

    handlerEditOrderList(idx, updatedBuyItemList);
  };

  const handlerEditOrderList = (
    idx: number,
    updatedBuyItemList: undefined | CartType[]
  ) => {
    if (updatedBuyItemList) {
      const totalPrice = updatedBuyItemList.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );

      if (window.confirm("반품을 신청하시겠습니까?")) {
        if (buyList) {
          axios
            .post("http://localhost:8080/product/order/edit", {
              user: user,
              findItem: buyList[idx].item,
              totalPrice: totalPrice,
              orderItem: updatedBuyItemList,
              returnItem: selectedItems,
              return: buyList[idx],
            })
            .then((res) => {
              alert(res.data);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        return;
      }
    }
  };

  return (
    <div className="buy-list">
      {buyList !== undefined ? (
        <>
          {buyList.map((list, idx) => {
            return (
              <div className="list-info" key={idx}>
                <div className="buy-info">
                  <div className="status-box">
                    <span>{list.status}</span>
                    <span>·</span>
                    <span>송장번호: {list.deliveryNumber}</span>
                  </div>
                  <div className="date-box">
                    <span>{list.date}</span>
                  </div>
                  <div className="price-box">
                    <span>{list.totalPrice.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="item-box">
                  <ul>
                    {list.item.map((it, i) => {
                      const isSelected = selectedItems.some(
                        (selectedItem: any) => selectedItem._id === it._id
                      );
                      return (
                        <li
                          key={i}
                          onClick={() => handleItemClick(it)}
                          className={isSelected ? "selected" : ""}
                        >
                          <div className="item-image">
                            <div className="selected">
                              {isSelected ? <LuCheck /> : ""}
                            </div>
                            <img src={it.image} alt="img" />
                          </div>
                          <div className="item-info">
                            <p>{it.name}</p>
                            <div className="item-info-detail">
                              <span>{it.color}</span>
                              <span>·</span>
                              <span>{it.size}</span>
                            </div>
                            <span>갯수: {it.count}개</span>
                            <span>
                              {it.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="return">
                  <span
                    onClick={() => {
                      handleReturn(idx);
                    }}
                  >
                    반품하기
                  </span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="load">구매내역이 없습니다.</div>
      )}
    </div>
  );
}

export default BuyList;
