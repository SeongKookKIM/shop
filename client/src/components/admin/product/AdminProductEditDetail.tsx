import React, { useEffect, useState } from "react";
import { ProductType } from "../../../type/Type";
import axios from "axios";

interface ProductStatusType {
  setProductStatus: React.Dispatch<React.SetStateAction<boolean>>;
  item: ProductType | undefined;
}

function AdminProductEditDetail({ setProductStatus, item }: ProductStatusType) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    alert(
      "상품 수정은 이름, 가격, 설명만 수정 가능합니다. (색상, 사이즈, 이미지 변경은 삭제 후 재등록 부탁드리겠습니다."
    );
    if (item) {
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
    }
  }, []);

  const handlerProductEdit = () => {
    if (item) {
      let itemEdit = {
        _id: item._id,
        name: name,
        price: price,
        description: description,
      };
      axios
        .post("http://localhost:8080/admin/product/edit", itemEdit)
        .then((res) => {
          alert(res.data);
          setProductStatus(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="admin-edit-detail">
      <div className="back">
        <span onClick={() => setProductStatus(false)}>뒤로가기</span>
      </div>
      <div className="product-edit-detail">
        <div className="edit-detail-name">
          <p>상품이름</p>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="edit-detail-price">
          <p>상품가격</p>
          <input
            type="number"
            name="price"
            autoComplete="off"
            value={price}
            onChange={(e) => {
              let priceCount = e.target.value;
              setPrice(parseInt(priceCount));
            }}
          />
        </div>
        <div className="edit-detail-description">
          <p>상품설명</p>
          <textarea
            typeof="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="edit-btn">
          <span onClick={handlerProductEdit}>수정하기</span>
        </div>
      </div>
    </div>
  );
}

export default AdminProductEditDetail;
