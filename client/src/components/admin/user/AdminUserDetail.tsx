import React, { useState } from "react";
import {
  RootState,
  handlerAdminMenu,
  handlerAdminPagesChange,
} from "../../../Store";
import { useDispatch, useSelector } from "react-redux";

import { LuArrowRight } from "react-icons/lu";
import AdminUserInfo from "./AdminUserInfo";
import AdminUserOrder from "./AdminUserOrder";
import AdminUserInqury from "./AdminUserInqury";

function AdminUserDetail() {
  const [userPageTab, setUserPageTab] = useState<string>("info");

  const adminNav = useSelector((state: RootState) => state.adminNav);
  const adminUserDetailId = useSelector(
    (state: RootState) => state.adminUserDetailId
  );

  let dispatch = useDispatch();

  return (
    <div
      className={
        adminNav.show ? "admin-user-detail" : "admin-user-detail active"
      }
    >
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
      <h6>회원 상세정보</h6>
      <div className="user-back">
        <span
          onClick={() => {
            dispatch(
              handlerAdminPagesChange({
                pages: "user",
              })
            );
          }}
        >
          back
        </span>
      </div>
      <ul className="user-tab">
        <li>
          <span onClick={() => setUserPageTab("info")}>상세</span>
        </li>
        <li>
          <span onClick={() => setUserPageTab("order")}>주문</span>
        </li>
        <li>
          <span onClick={() => setUserPageTab("return")}>반품</span>
        </li>
        <li>
          <span onClick={() => setUserPageTab("inqury")}>문의</span>
        </li>
      </ul>

      {userPageTab === "info" && <AdminUserInfo id={adminUserDetailId._id} />}
      {userPageTab === "order" && (
        <AdminUserOrder id={adminUserDetailId._id} status={"order"} />
      )}
      {userPageTab === "return" && (
        <AdminUserOrder id={adminUserDetailId._id} status={"return"} />
      )}
      {userPageTab === "inqury" && (
        <AdminUserInqury id={adminUserDetailId._id} />
      )}
    </div>
  );
}

export default AdminUserDetail;
