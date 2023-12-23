import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubMenu from "../menu/SubMenu";
import Footer from "../footer/Footer";

import axios from "axios";
import { ProductBuyListType } from "../../type/Type";

function MobilePayment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<ProductBuyListType | undefined>();

  const imp_success = searchParams.get("imp_success");

  let navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("pay");

    if (localUser) {
      setData(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (imp_success === "true") {
        axios
          .post("/order", data)
          .then((res) => {
            axios
              .post("/cart/delete", { user: data.user })
              .then((res) => {
                alert("구매해주셔서 감사합니다.");
                navigate("/");
                window.location.reload();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        alert(`결제 실패하셨습니다.`);
        navigate("/");
      }
    }
  }, [data]);

  return (
    <div className="payments-success">
      <SubMenu />
      <div className="payments-wrapper">
        <p>
          {imp_success === "true"
            ? "결제가 완료되었습니다."
            : "결제에 실패하였습니다."}
        </p>
        <span
          onClick={() => {
            navigate("/user");
          }}
        >
          구매내역
        </span>
      </div>

      <Footer classPadding="" />
    </div>
  );
}

export default MobilePayment;
