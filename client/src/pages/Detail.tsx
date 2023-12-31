import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Info from "../components/detail/Info";
import DetailImage from "../components/detail/DetailImage";
import ItemOrder from "../components/detail/ItemOrder";
import { ProductType } from "../type/Type";
import SubMenu from "../components/menu/SubMenu";
import Footer from "../components/footer/Footer";
import Recommend from "../components/detail/Recommend";

function Detail() {
  const [item, setItem] = useState<ProductType>();

  const itemLocation = useLocation();
  useEffect(() => {
    setItem(itemLocation.state.it);
  }, [itemLocation]);

  return (
    <div className="detail">
      <SubMenu />
      <div className="detail-inner">
        <Info />
        <DetailImage detailItem={item} />
        <ItemOrder detailItem={item} />
      </div>
      <Recommend />
      <Footer classPadding={""} />
    </div>
  );
}

export default Detail;
