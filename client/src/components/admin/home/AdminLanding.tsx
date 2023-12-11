import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { RootState, handlerAdminMenu } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function AdminLanding() {
  const [newOrderCount, setNewOrderCount] = useState<number>();
  const [newReturnCount, setNewReturnCount] = useState<number>();
  const [newInquryCount, setNewInquryCount] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/home/newOrder")
      .then((res) => {
        setNewOrderCount(res.data);
        axios
          .post("http://localhost:8080/admin/home/newReturn")
          .then((res) => {
            setNewReturnCount(res.data);

            axios
              .post("http://localhost:8080/admin/home/newInqury")
              .then((res) => {
                setNewInquryCount(res.data);

                axios
                  .post("http://localhost:8080/admin/home/totalPrice")
                  .then((res) => {
                    setTotalPrice(res.data);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  let dispatch = useDispatch();

  const adminNav = useSelector((state: RootState) => state.adminNav);

  return (
    <div className={adminNav.show ? "admin-landing" : "admin-landing active"}>
      <div className="nav-show">
        {adminNav.show ? (
          ""
        ) : (
          <LuArrowRight
            onClick={() => {
              dispatch(handlerAdminMenu(true));
            }}
          />
        )}
      </div>

      <h6>최신요약 확인하기</h6>
      <ul>
        <li>
          <p>신규 주문수</p>
          <span>{newOrderCount}건</span>
        </li>
        <li>
          <p>신규 반품수</p>
          <span>{newReturnCount}건</span>
        </li>
        <li>
          <p>정산예정 금액</p>
          <span>{totalPrice?.toLocaleString()} 원</span>
        </li>
        <li>
          <p>신규 문의글</p>
          <span>{newInquryCount}건</span>
        </li>
      </ul>

      <div className="summary-box">
        <span>회원정보</span>
        <span>상품정보</span>
        <span>주문정보</span>
        <span>고객문의</span>
      </div>
    </div>
  );
}

export default AdminLanding;
