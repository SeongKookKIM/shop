import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Info from "../components/detail/Info";
import DetailImage from "../components/detail/DetailImage";
import ItemOrder from "../components/detail/ItemOrder";

type ProductType = {
  color: string[];
  description: string;
  mainCategory: string;
  name: string;
  price: string;
  size: string[];
  src: string[];
  subCategory: string;
  thumbnail: string;
  _id: string;
};

function Detail() {
  const [item, setItem] = useState<ProductType>();

  const itemLocation = useLocation();
  useEffect(() => {
    setItem(itemLocation.state.it);
  }, []);

  return (
    <div className="detail">
      <div className="detail-inner">
        <Info />
        <DetailImage detailItem={item} />
        <ItemOrder detailItem={item} />
      </div>
    </div>
  );
}

export default Detail;
