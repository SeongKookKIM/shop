import React, { useEffect, useState } from "react";
import { RootState, handlerAdminMenu } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowRight } from "react-icons/lu";
import axios from "axios";
import { ReturnItemType } from "../../../type/Type";

function AdminReturn() {
  const [deliveryStatus, setDeliveryStatus] = useState<string>("반품신청");
  const [list, setList] = useState<ReturnItemType[]>();
  const [returnNumber, setReturnNumber] = useState<string>("");
  const [returnStatus, setReturnStatus] = useState<string>("반품신청");

  const adminNav = useSelector((state: RootState) => state.adminNav);
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/return", {
        status: deliveryStatus,
      })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [deliveryStatus]);

  //   반품신청
  const handlerReturnNumber = (returnList: ReturnItemType) => {
    if (returnStatus === "반품진행중") {
      if (returnNumber === "") {
        alert("반품번호를 입력해주세요.");
      } else {
        if (window.confirm("반품진행 상태를 변경하시겠습니까?")) {
          axios
            .post("http://localhost:8080/admin/return/number", {
              _id: returnList._id,
              status: returnStatus,
              returnNumber: returnNumber,
            })
            .then((res) => {
              alert(res.data);
              axios
                .post("http://localhost:8080/admin/return", {
                  status: returnStatus,
                })
                .then((res) => {
                  setList(res.data);
                  setReturnStatus(res.data.status);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          return;
        }
      }
    } else {
      alert("반품진행 상태를 확인해주세요.");
    }
  };

  //   반품진행
  const handlerReturnConfirm = (returnList: ReturnItemType) => {
    if (returnStatus === "반품완료") {
      if (window.confirm("반품진행 상태를 변경하시겠습니까?")) {
        axios
          .post("http://localhost:8080/admin/return/confirm", {
            _id: returnList._id,
            status: returnStatus,
          })
          .then((res) => {
            alert(res.data);
            axios
              .post("http://localhost:8080/admin/return", {
                status: returnStatus,
              })
              .then((res) => {
                setList(res.data);
                setReturnStatus(res.data.status);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        return;
      }
    } else {
      alert("반품진행 상태를 확인해주세요.");
    }
  };

  return (
    <div className={adminNav.show ? "admin-return" : "admin-return active"}>
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
      <h6>반품관리</h6>
      <div className="admin-return-status">
        <span onClick={() => setDeliveryStatus("반품신청")}>반품신청</span>
        <span onClick={() => setDeliveryStatus("반품진행중")}>반품진행중</span>
        <span onClick={() => setDeliveryStatus("반품완료")}>반품완료</span>
      </div>

      <div className="admin-return-list">
        {list && list.length > 0 ? (
          <>
            {list.map((returnList, idx) => {
              return (
                <div className="delivery-wrapper" key={idx}>
                  <div className="delivery-info">
                    <div className="admin-user-info">
                      <span>{returnList.name}</span>
                      <span>·</span>
                      <span>{returnList.phone}</span>
                    </div>
                    <div className="order-address">
                      <span>{returnList.address}</span>
                      <span>{returnList.adressDetail}</span>
                    </div>
                    <div className="date">
                      <p>
                        반품신청날짜: <span>{returnList.date}</span>
                      </p>
                    </div>
                    <div className="info-status">
                      <select
                        name="status"
                        onChange={(e) => setReturnStatus(e.target.value)}
                      >
                        <option value={""} disabled>
                          배송상태를 입력해주세요.
                        </option>
                        {returnList.status === "반품신청" && (
                          <>
                            {" "}
                            <option value={"반품신청"}>반품신청</option>
                            <option value={"반품진행중"}>반품진행중</option>
                          </>
                        )}
                        {returnList.status === "반품진행중" && (
                          <>
                            {" "}
                            <option value={"반품진행중"}>반품진행중</option>
                            <option value={"반품완료"}>반품완료</option>
                          </>
                        )}
                        {returnList.status === "반품완료" && (
                          <>
                            {" "}
                            <option value={"반품완료"}>반품완료</option>
                          </>
                        )}
                      </select>
                      {returnList.status === "반품신청" ? (
                        <>
                          {" "}
                          {returnStatus !== undefined &&
                            returnStatus !== "반품신청" && (
                              <div className="status-number">
                                <p>송장번호:</p>
                                <input
                                  type="text"
                                  name="deliveryNumber"
                                  autoComplete="off"
                                  value={returnNumber || ""}
                                  onChange={(e) =>
                                    setReturnNumber(e.target.value)
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
                            value={returnList.returnNumber}
                            disabled
                          />
                        </div>
                      )}
                    </div>
                    <div className="info-price">
                      <p>
                        총합:{" "}
                        <span>
                          {returnList.returnPrice.toLocaleString()} 원
                        </span>
                      </p>
                    </div>
                    <div className="message">
                      {returnList.status === "반품완료" ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          className="return-btn"
                          onClick={() => {
                            if (returnList.status === "반품신청") {
                              handlerReturnNumber(returnList);
                            } else {
                              handlerReturnConfirm(returnList);
                            }
                          }}
                        >
                          저장
                        </button>
                      )}
                    </div>
                  </div>

                  {returnList.item.map((item, i) => {
                    return (
                      <div className="delivery-list" key={i}>
                        <div className="delevery-item">
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
                              <span>{item.count}개</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default AdminReturn;
