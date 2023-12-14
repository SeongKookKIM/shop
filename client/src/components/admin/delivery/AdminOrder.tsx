import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerAdminMenu } from "../../../Store";

function AdminOrder() {
  const adminNav = useSelector((state: RootState) => state.adminNav);
  let dispatch = useDispatch();

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

      <div className="admin-order-list">
        <div className="delivery-wrapper">
          <div className="delivery-info">
            <div className="info-name">
              <p>이름</p>
            </div>
            <div className="info-status">
              <select>
                <option>배송상태를 입력하세요.</option>
                <option>배송중</option>
                <option>배송완료</option>
              </select>
              <div className="status-number">
                <p>
                  송장번호: <span>1234</span>
                </p>
              </div>
            </div>
            <div className="info-price">
              <p>
                총합: <span>1234원</span>
              </p>
            </div>
            <div className="date">
              <p>
                구매날짜: <span>1234</span>
              </p>
            </div>
          </div>

          <div className="delivery-list"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
