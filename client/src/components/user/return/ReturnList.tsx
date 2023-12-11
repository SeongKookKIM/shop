import React, { useEffect, useState } from "react";
import { ReturnItemType, UserType } from "../../../type/Type";
import axios from "axios";
import Footer from "../../footer/Footer";

interface UserPropsType {
  user: UserType | undefined;
}

function ReturnList({ user }: UserPropsType) {
  const [returnList, setReturnList] = useState<ReturnItemType[] | undefined>();

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:8080/product/return", { _id: user._id })
        .then((res) => {
          setReturnList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="return-list">
      {returnList && returnList.length > 0 ? (
        <>
          {returnList.map((item, idx) => {
            return (
              <div className="list-info" key={idx}>
                <div className="buy-info">
                  <div className="status-box">
                    <span>{item.status}</span>
                    <span>·</span>
                    <span>송장번호: {item.returnNumber}</span>
                  </div>
                  <div className="date-box">
                    <span>{item.date}</span>
                  </div>
                  <div className="price-box">
                    <span>반품금액: {item.returnPrice.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="item-box">
                  <ul>
                    {item.item.map((it, i) => {
                      return (
                        <li key={i} style={{ pointerEvents: "none" }}>
                          <div className="item-image">
                            <img src={it.image} alt="img" />
                          </div>
                          <div className="item-info">
                            <p>{it.name}</p>
                            <div className="item-info-detail">
                              <span>{it.color}</span>
                              <span>·</span>
                              <span>{it.size}</span>
                            </div>
                            <span>{it.count}개</span>
                            <span>{Number(it.price).toLocaleString()} 원</span>
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
          className="load"
          style={{
            width: "100%",
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          반품내역이 없습니다.
        </div>
      )}
      <Footer classPadding="" />
    </div>
  );
}

export default ReturnList;
