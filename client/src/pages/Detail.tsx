import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  console.log(item);

  const itemLocation = useLocation();
  useEffect(() => {
    setItem(itemLocation.state.it);
  }, []);

  return <div>Detail</div>;
}

export default Detail;
