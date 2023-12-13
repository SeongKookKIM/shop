import React from "react";

import { LuArrowRight } from "react-icons/lu";
import { RootState, handlerAdminMenu } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";

function AdminProductEdit() {
  const adminNav = useSelector((state: RootState) => state.adminNav);
  let dispatch = useDispatch();

  return (
    <div
      className={
        adminNav.show ? "admin-product-edit" : "admin-product-edit active"
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
      <h6>상품수정</h6>
    </div>
  );
}

export default AdminProductEdit;
