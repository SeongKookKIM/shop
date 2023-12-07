import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InquryType } from "../../../type/Type";

function InquryDetail() {
  const [inquryList, setInquryList] = useState<InquryType>();

  let list = useLocation();

  useEffect(() => {
    setInquryList(list.state);
  }, []);

  return <div className="inqury-detail">InquryDetail</div>;
}

export default InquryDetail;
