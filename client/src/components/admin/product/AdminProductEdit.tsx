import React, { useState } from "react";

import { LuArrowRight } from "react-icons/lu";
import { RootState, handlerAdminMenu } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";
import AdminProductList from "./AdminProductList";
import AdminProductEditDetail from "./AdminProductEditDetail";
import { ProductType } from "../../../type/Type";

function AdminProductEdit() {
  const [productStatus, setProductStatus] = useState<boolean>(false);
  const [item, setItem] = useState<ProductType>();

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

      {productStatus ? (
        <AdminProductEditDetail
          setProductStatus={setProductStatus}
          item={item}
        />
      ) : (
        <AdminProductList
          setProductStatus={setProductStatus}
          setItem={setItem}
        />
      )}
    </div>
  );
}

export default AdminProductEdit;
