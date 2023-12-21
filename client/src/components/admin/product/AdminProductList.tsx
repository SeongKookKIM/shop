import React, { useEffect, useState } from "react";
import { ProductType } from "../../../type/Type";
import axios from "axios";

interface ProductStatusType {
  setProductStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
}

function AdminProductList({ setProductStatus, setItem }: ProductStatusType) {
  const [itemMainSort, setItemMainSort] = useState<string>("");
  const [itemSubSort, setItemSubSort] = useState<string>("");
  const [itemList, setItmeList] = useState<ProductType[]>([]);

  useEffect(() => {
    axios
      .post("/admin/product/list", {
        main: itemMainSort,
        sub: itemSubSort,
      })
      .then((res) => {
        setItmeList(res.data);
      })
      .catch((err) => console.log(err));
  }, [itemMainSort, itemSubSort]);

  const handelrAdminProductDelete = (item: ProductType) => {
    if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
      axios
        .post("/admin/product/delete", item)
        .then((res) => {
          alert(res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className="admin-product-list">
      <div className="product-sort-box">
        <div className="sort-main">
          <span
            onClick={() => {
              setItemMainSort("");
              setItemSubSort("");
            }}
          >
            전체상품
          </span>
          <span onClick={() => setItemMainSort("all")}>All</span>
          <span onClick={() => setItemMainSort("men")}>Men</span>
          <span onClick={() => setItemMainSort("women")}>Women</span>
          <span onClick={() => setItemMainSort("home")}>Home</span>
        </div>
        <div className="sort-sub">
          {itemMainSort === "" && ""}
          {itemMainSort === "all" && (
            <>
              <span onClick={() => setItemSubSort("best")}>Best</span>
              <span onClick={() => setItemSubSort("new")}>New</span>
              <span onClick={() => setItemSubSort("coat")}>Coat</span>
              <span onClick={() => setItemSubSort("life")}>Life</span>
            </>
          )}
          {itemMainSort === "men" && (
            <>
              <span onClick={() => setItemSubSort("best")}>Best</span>
              <span onClick={() => setItemSubSort("new")}>New</span>
              <span onClick={() => setItemSubSort("collection")}>
                Collection
              </span>
            </>
          )}
          {itemMainSort === "women" && (
            <>
              <span onClick={() => setItemSubSort("best")}>Best</span>
              <span onClick={() => setItemSubSort("new")}>New</span>
              <span onClick={() => setItemSubSort("collection")}>
                Collection
              </span>
            </>
          )}
          {itemMainSort === "home" && (
            <span onClick={() => setItemSubSort("deco")}>Deco</span>
          )}
        </div>
      </div>

      <ul>
        {itemList && itemList.length > 0 ? (
          <>
            {itemList.map((item, idx) => {
              return (
                <li key={idx}>
                  <div className="product-image">
                    <img src={item.thumbnail} />
                  </div>
                  <div className="product-info">
                    <p>{item.name}</p>
                    <div className="info-btn">
                      <span
                        onClick={() => {
                          setProductStatus(true);
                          setItem(item);
                        }}
                      >
                        수정하기
                      </span>
                      <span onClick={() => handelrAdminProductDelete(item)}>
                        삭제하기
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          <div className="prodcut-none">
            <span>상품이 존재하지 않습니다.</span>
          </div>
        )}
      </ul>
    </div>
  );
}

export default AdminProductList;
