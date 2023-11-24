import React, { useState } from "react";

function Product() {
  const [itemLayout, setItemLayout] = useState<string>("big");

  return (
    <div className="product">
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
        {itemLayout === "big" && <BigProduct />}
        {itemLayout === "mid" && <MidProduct />}
        {itemLayout === "small" && <SmallProduct />}
      </div>
    </div>
  );
}

function BigProduct() {
  return (
    <>
      <div className="first-item-wrapper">
        <div className="item">
          <img src="/assets/product/all/best01/best01.jpg" />
          <div className="item-detail">
            <p>best01</p>
            <span>1,000원</span>
          </div>
        </div>
      </div>
      <div className="second-item-wrapper">
        <div className="item">
          <img src="/assets/product/all/best02/best01.jpg" />
          <div className="item-detail">
            <p>best02</p>
            <span>1,000원</span>
          </div>
        </div>
        <div className="item">
          <img src="/assets/product/all/best03/best01.jpg" />
          <div className="item-detail">
            <p>best03</p>
            <span>1,000원</span>
          </div>
        </div>
      </div>

      <div className="first-item-wrapper">
        <div className="item">
          <img src="/assets/product/all/new01/new01.jpg" />
          <div className="item-detail">
            <p>new01</p>
            <span>1,000원</span>
          </div>
        </div>
      </div>
      <div className="second-item-wrapper">
        <div className="item">
          <img src="/assets/product/all/new02/new01.jpg" />
          <div className="item-detail">
            <p>new02</p>
            <span>1,000원</span>
          </div>
        </div>
        <div className="item">
          <img src="/assets/product/all/new03/new01.jpg" />
          <div className="item-detail">
            <p>new03</p>
            <span>1,000원</span>
          </div>
        </div>
      </div>
    </>
  );
}

function MidProduct() {
  return (
    <div className="item-mid">
      <div className="item">
        <img src="/assets/product/all/best01/best01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/best02/best01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/best03/best01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/new01/new01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/new02/new01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
        <div className="item-detail">
          <p>best01</p>
          <span>1,000원</span>
        </div>
      </div>
    </div>
  );
}

function SmallProduct() {
  return (
    <div className="item-small">
      <div className="item">
        <img src="/assets/product/all/best01/best01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/best02/best01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/best03/best01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new01/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new02/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
      <div className="item">
        <img src="/assets/product/all/new03/new01.jpg" />
      </div>
    </div>
  );
}

export default Product;
