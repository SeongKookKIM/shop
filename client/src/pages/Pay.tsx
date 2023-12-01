import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cartType } from "../type/Type";

function Pay() {
  const [itemList, setItemList] = useState<cartType>();
  const [totlaPrice, setTotalPrice] = useState<number>(0);

  let item = useLocation();

  useEffect(() => {
    if (item) {
      setItemList(item.state.cartList);
      setTotalPrice(item.state.totalPrice);
    }
  }, []);

  return <div>Pay</div>;
}

export default Pay;
