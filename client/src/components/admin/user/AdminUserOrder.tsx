import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductBuyListType, ReturnItemType } from "../../../type/Type";

interface IdPropsType {
  id: string;
  status: string;
}

function AdminUserOrder({ id, status }: IdPropsType) {
  const [userOrderList, setUserOrderList] = useState<
    ProductBuyListType[] | undefined
  >();
  const [userReturnList, setUserReturnList] = useState<
    ReturnItemType[] | undefined
  >();

  useEffect(() => {
    axios
      .post(`http://localhost:8080/admin/user/${status}`, { _id: id })
      .then((res) => {
        setUserOrderList(res.data);
        setUserReturnList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);
  return (
    <div className="user-order">
      {status === "order" && (
        <>
          {" "}
          {userOrderList && userOrderList.length > 0 ? (
            <>
              {userOrderList.map((it, idx) => {
                return (
                  <div className="order-list" key={idx}>
                    <div className="list-info">
                      <div className="status-box">
                        <span>{it.status}</span>
                        <span>·</span>
                        <span>송장번호: {it.deliveryNumber}</span>
                      </div>
                      <div className="date-box">
                        <span>{it.date}</span>
                      </div>
                      <div className="price-box">
                        <span>{it.totalPrice.toLocaleString()} 원</span>
                      </div>
                    </div>

                    <div className="item-box">
                      <ul>
                        {it.item.map((item, i) => {
                          return (
                            <li key={i}>
                              <div className="item-image">
                                <img src={item.image} />
                              </div>
                              <div className="item-info">
                                <p>{item.name}</p>
                                <div className="item-info-detail">
                                  <span>{item.color}</span>
                                  <span>·</span>
                                  <span>{item.size}</span>
                                </div>
                                <span>갯수: {item.count}개</span>
                                <span>
                                  {item.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  원
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div
              style={{
                width: "100%",
                fontSize: "14px",
              }}
            >
              상품이 존재하지 않습니다.
            </div>
          )}
        </>
      )}
      {status === "return" && (
        <>
          {" "}
          {userReturnList && userReturnList.length > 0 ? (
            <>
              {userReturnList.map((it, idx) => {
                return (
                  <div className="order-list" key={idx}>
                    <div className="list-info">
                      <div className="status-box">
                        <span>{it.status}</span>
                        <span>·</span>
                        <span>송장번호: {it.returnNumber}</span>
                      </div>
                      <div className="date-box">
                        <span>{it.date}</span>
                      </div>
                      <div className="price-box">
                        <span>{it.returnPrice.toLocaleString()} 원</span>
                      </div>
                    </div>

                    <div className="item-box">
                      <ul>
                        {it.item.map((item, i) => {
                          return (
                            <li key={i}>
                              <div className="item-image">
                                <img src={item.image} />
                              </div>
                              <div className="item-info">
                                <p>{item.name}</p>
                                <div className="item-info-detail">
                                  <span>{item.color}</span>
                                  <span>·</span>
                                  <span>{item.size}</span>
                                </div>
                                <span>갯수: {item.count}개</span>
                                <span>
                                  {item.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  원
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div
              style={{
                width: "100%",
                fontSize: "14px",
              }}
            >
              상품이 존재하지 않습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminUserOrder;
