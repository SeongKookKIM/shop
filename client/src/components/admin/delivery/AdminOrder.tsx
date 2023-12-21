import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerAdminMenu } from "../../../Store";
import { ProductBuyListType } from "../../../type/Type";
import axios from "axios";
import { flushSync } from "react-dom";

function AdminOrder() {
  const [deliveryStatus, setDeliveryStatus] = useState<string>("상품준비중");
  const [list, setList] = useState<ProductBuyListType[]>();

  const [status, setStatus] = useState<string>("");
  const [deliveryNumber, setDeliveryNumber] = useState<string>("");

  const adminNav = useSelector((state: RootState) => state.adminNav);
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("/admin/delivery", {
        status: deliveryStatus,
      })
      .then((res) => {
        setList(res.data);
        flushSync(() => {
          setStatus(res.data.status);
          setDeliveryNumber(res.data.deliveryNumber);
        });
      })
      .catch((err) => console.log(err));
  }, [deliveryStatus]);

  // 상품준비중
  const hanlderDeliveryEdit = (delivery: ProductBuyListType) => {
    if (status === "배송중") {
      if (deliveryNumber !== undefined) {
        if (window.confirm("배송상태를 변경하시겠습니까?")) {
          axios
            .post("/admin/delivery/edit", {
              _id: delivery._id,
              status: status,
              deliveryNumber: deliveryNumber,
            })
            .then((res) => {
              axios
                .post("/admin/delivery", {
                  status: deliveryStatus,
                })
                .then((res) => {
                  setList(res.data);
                  setStatus(res.data.status);
                  setDeliveryNumber(res.data.deliveryNumber);
                })
                .catch((err) => console.log(err));
            });
        } else {
          return;
        }
      } else {
        alert("송장번호를 확인해주세요.");
      }
    } else {
      alert("배송상태를 확인해주세요.");
    }
  };

  // 배송중
  const hanlderDelivery = (delivery: ProductBuyListType) => {
    if (status === "배송완료") {
      if (window.confirm("배송상태를 변경하시겠습니까?")) {
        axios
          .post("/admin/delivery/confirm", {
            _id: delivery._id,
            status: status,
          })
          .then((res) => {
            axios
              .post("/admin/delivery", {
                status: deliveryStatus,
              })
              .then((res) => {
                setList(res.data);
                flushSync(() => {
                  setStatus(res.data.status);
                  setDeliveryNumber(res.data.deliveryNumber);
                });
              })
              .catch((err) => console.log(err));
          });
      } else {
        return;
      }
    } else {
      alert("배송상태를 확인해주세요.");
    }
  };

  return (
    <div className={adminNav.show ? "admin-order" : "admin-order active"}>
      <div className="nav-show">
        {adminNav.show ? (
          ""
        ) : (
          <LuArrowRight
            onClick={() => {
              dispatch(handlerAdminMenu(true));
            }}
          />
        )}
      </div>
      <h6>배송관리</h6>

      <div className="admin-order-status">
        <span onClick={() => setDeliveryStatus("상품준비중")}>상품준비중</span>
        <span onClick={() => setDeliveryStatus("배송중")}>배송중</span>
        <span onClick={() => setDeliveryStatus("배송완료")}>배송완료</span>
      </div>

      <div className="admin-order-list">
        {list && list.length > 0 ? (
          <>
            {list.map((delivery, idx) => {
              return (
                <div className="delivery-wrapper" key={idx}>
                  <div className="delivery-info">
                    <div className="admin-user-info">
                      <span>{delivery.userName}</span>
                      <span>·</span>
                      <span>{delivery.userPhone}</span>
                    </div>
                    <div className="order-address">
                      <span>{delivery.userAddress}</span>
                      <span>{delivery.userAddressDetail}</span>
                    </div>
                    <div className="date">
                      <p>
                        구매날짜: <span>{delivery.date}</span>
                      </p>
                    </div>
                    <div className="info-status">
                      {delivery.status === "상품준비중" && (
                        <select
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={""} disabled>
                            배송상태를 입력해주세요.
                          </option>
                          <option value={"상품준비중"}>상품준비중</option>
                          <option value={"배송중"}>배송중</option>
                        </select>
                      )}
                      {delivery.status === "배송중" && (
                        <select
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={""} disabled>
                            배송상태를 입력해주세요.
                          </option>
                          <option value={"배송중"}>배송중</option>
                          <option value={"배송완료"}>배송완료</option>
                        </select>
                      )}
                      {delivery.status === "배송완료" && (
                        <select
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={""} disabled>
                            배송상태를 입력해주세요.
                          </option>
                          <option value={"배송완료"}>배송완료</option>
                        </select>
                      )}
                      {delivery.status === "상품준비중" ? (
                        <>
                          {" "}
                          {status !== undefined && status !== "상품준비중" && (
                            <div className="status-number">
                              <p>송장번호:</p>
                              <input
                                type="text"
                                name="deliveryNumber"
                                autoComplete="off"
                                value={deliveryNumber || ""}
                                onChange={(e) =>
                                  setDeliveryNumber(e.target.value)
                                }
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="status-number">
                          <p>송장번호:</p>
                          <input
                            type="text"
                            name="deliveryNumber"
                            autoComplete="off"
                            value={delivery.deliveryNumber}
                            disabled
                          />
                        </div>
                      )}
                    </div>
                    <div className="info-price">
                      <p>
                        총합:{" "}
                        <span>{delivery.totalPrice.toLocaleString()}원</span>
                      </p>
                    </div>
                    <div className="message">
                      <span>배송 요청</span>
                      <textarea
                        typeof="text"
                        autoComplete="off"
                        disabled={true}
                        value={delivery.userMessage}
                      />
                      {deliveryStatus === "배송완료" ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (deliveryStatus === "상품준비중") {
                              hanlderDeliveryEdit(delivery);
                            } else {
                              hanlderDelivery(delivery);
                            }
                          }}
                        >
                          저장
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="delivery-list">
                    {delivery.item.map((item, i) => {
                      return (
                        <div className="delevery-item" key={i}>
                          <div className="delivery-list-image">
                            <img src={item.image} />
                          </div>
                          <div className="delivery-list-info">
                            <div className="product-name">
                              <span>{item.name}</span>
                            </div>
                            <div className="product-price">
                              <span>{item.price.toLocaleString()} 원</span>
                            </div>
                            <div className="product-option">
                              <span>{item.color}</span>
                              <span>·</span>
                              <span>{item.size}</span>
                            </div>
                            <div className="product-totalt-count">
                              <span>갯수: </span>
                              <span>{item.count}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <span style={{ fontSize: "13px" }}>목록이 존재하지 않습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrder;
