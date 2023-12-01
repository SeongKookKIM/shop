import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Pay() {
  const [itemList, setItemList] = useState();

  let item = useLocation();
  console.log(item.state);

  return <div>Pay</div>;
}

export default Pay;
