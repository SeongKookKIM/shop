import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../type/Type";
import SubMenu from "../components/menu/SubMenu";
import Footer from "../components/footer/Footer";

function Product() {
  const [itemLayout, setItemLayout] = useState<string>("big");
  const [itemList, setItemList] = useState<ProductType[] | undefined>();

  let { category, item } = useParams();

  useEffect(() => {
    axios
      .post("/product", {
        mainCategory: category,
        subCategory: item,
      })
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, item]);

  return (
    <div className="product">
      <SubMenu />
      <div className="product-wrapper">
        <div className="product-layout">
          <img
            src="/assets/layer01.png"
            alt="big"
            onClick={() => setItemLayout("big")}
          />
          <img
            src="/assets/layer02.png"
            alt="mid"
            onClick={() => setItemLayout("mid")}
          />
          <img
            src="/assets/layer03.png"
            alt="small"
            onClick={() => setItemLayout("small")}
          />
        </div>
        {itemLayout === "big" && <BigProduct itemList={itemList} />}
        {itemLayout === "mid" && <MidProduct itemList={itemList} />}
        {itemLayout === "small" && <SmallProduct itemList={itemList} />}
      </div>
      <Footer classPadding={""} />
    </div>
  );
}

function BigProduct({ itemList }: any) {
  let navigate = useNavigate();

  return (
    <>
      <div className="item-wrapper">
        {itemList && itemList.length > 0 ? (
          <>
            {itemList.map((it: ProductType, i: number) => {
              return (
                <div className="item" key={i}>
                  <img
                    src={it.thumbnail}
                    alt="item"
                    onClick={() => {
                      navigate(`/detail/${it._id}`, { state: { it } });
                    }}
                  />
                  <div className="item-detail">
                    <p>{it.name}</p>
                    <span>
                      {it.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="item-none">
            <p>상품준비중입니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

function MidProduct({ itemList }: any) {
  let navigate = useNavigate();

  return (
    <div className="item-mid">
      {itemList && itemList.length > 0 ? (
        <>
          {itemList.map((it: ProductType, i: number) => {
            return (
              <div className="item" key={i}>
                <img
                  src={it.thumbnail}
                  onClick={() => {
                    navigate(`/detail/${it._id}`, { state: { it } });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
                <div className="item-detail">
                  <p>{it.name}</p>
                  <span>
                    {it.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="item-none">
          <p>상품준비중입니다.</p>
        </div>
      )}
    </div>
  );
}

function SmallProduct({ itemList }: any) {
  let navigate = useNavigate();
  return (
    <div className="item-small">
      {itemList && itemList.length > 0 ? (
        <>
          {itemList.map((it: ProductType, i: number) => {
            return (
              <div className="item" key={i}>
                <img
                  src={it.thumbnail}
                  onClick={() => {
                    navigate(`/detail/${it._id}`, { state: { it } });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="item-none">
          <p>상품준비중입니다.</p>
        </div>
      )}
    </div>
  );
}

export default Product;
