import React, { useEffect, useState } from "react";
import { ProductType } from "../../../type/Type";
import axios from "axios";

function AdminProductList() {
  const [itemMainSort, setItemMainSort] = useState<string>("");
  const [itemSubSort, setItemSubSort] = useState<string>("");
  const [itemList, setItmeList] = useState<ProductType[]>([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/product/list", {
        main: itemMainSort,
        sub: itemSubSort,
      })
      .then((res) => {
        setItmeList(res.data);
      })
      .catch((err) => console.log(err));
  }, [itemMainSort, itemSubSort]);

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
                      <span>수정하기</span>
                      <span>삭제하기</span>
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
