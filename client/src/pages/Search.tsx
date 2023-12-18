import React, { useDeferredValue, useEffect, useState } from "react";
import SubMenu from "../components/menu/SubMenu";
import { ProductType } from "../type/Type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

function Search() {
  const [allItem, setAllItem] = useState<ProductType[]>();

  const [searchItem, setSearchItem] = useState<ProductType[]>();

  const [search, setSearch] = useState<string>("");
  let searchText = useDeferredValue(search);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8080/search")
      .then((res) => {
        setAllItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8080/search/item", { value: searchText })
      .then((res) => {
        setSearchItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [searchText]);

  return (
    <div className="search">
      <SubMenu />
      <div className="search-box">
        <input
          type="text"
          name="search"
          placeholder="상품, 색상, 컬렉션 등을 검색하세요."
          autoComplete="off"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="search-item-list">
        <ul>
          {searchItem && searchItem.length > 0 ? (
            <>
              {searchItem.map((it, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(`/detail/${it._id}`, { state: { it } });
                    }}
                  >
                    <div className="item-image">
                      <img src={it.thumbnail} />
                    </div>
                    <div className="item-info">
                      <p>{it.name}</p>
                      <span>{Number(it.price).toLocaleString()} 원</span>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {allItem?.map((it, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(`/detail/${it._id}`, { state: { it } });
                    }}
                  >
                    <div className="item-image">
                      <img src={it.thumbnail} />
                    </div>
                    <div className="item-info">
                      <p>{it.name}</p>
                      <span>{Number(it.price).toLocaleString()} 원</span>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
      <Footer classPadding="" />
    </div>
  );
}

export default Search;
