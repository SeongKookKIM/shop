import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartType, UserType } from "../type/Type";
import { LuArrowLeft } from "react-icons/lu";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import PayDelivery from "../components/pay/PayDelivery";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import axios from "axios";
import SubMenu from "../components/menu/SubMenu";
import Footer from "../components/footer/Footer";

function Pay() {
  const [itemList, setItemList] = useState<CartType[]>();
  const [itemLength, setItemLenght] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserType>();
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  let item = useLocation();
  let navigate = useNavigate();

  const payAddress = useSelector((state: RootState) => state.payAddress);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUserInfo(JSON.parse(localUser));
    }
    if (item) {
      setItemList(item.state.cartList);
      setTotalPrice(item.state.totalPrice);
      setItemLenght(item.state.cartList.length);
    }
  }, []);

  // 주소 편집 버튼
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 결제버튼
  function handlePayment() {
    let mobileData = {
      user: userInfo?._id,
      userName: userInfo?.name,
      userEmail: userInfo?.email,
      userPhone: userInfo?.phone,
      userAddress: payAddress.address,
      userAddressDetail: payAddress.addressDetail,
      userMessage: message,
      totalPrice: totalPrice,
      status: "상품준비중",
      deliveryNumber: "",
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      item: itemList,
    };

    localStorage.setItem("pay", JSON.stringify(mobileData));

    const { IMP }: any = window;
    IMP.init("imp64877406");

    const data = {
      pg: "kcp",
      pay_method: "card",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: "shop구매",
      amount: totalPrice,
      buyer_email: userInfo?.email,
      buyer_name: userInfo?.name,
      buyer_tel: userInfo?.phone,
      buyer_addr: `${payAddress.address} ${payAddress.addressDetail}`,
      m_redirect_url: "https://shop-406211.du.r.appspot.com/pay/success",
    };

    IMP.request_pay(data, callback);
  }
  const callback = (res: any) => {
    const { success, error_msg } = res;

    let data = {
      user: userInfo?._id,
      userName: userInfo?.name,
      userEmail: userInfo?.email,
      userPhone: userInfo?.phone,
      userAddress: payAddress.address,
      userAddressDetail: payAddress.addressDetail,
      userMessage: message,
      totalPrice: totalPrice,
      status: "상품준비중",
      deliveryNumber: "",
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      item: itemList,
    };
    if (success) {
      axios
        .post("/order", data)
        .then((res) => {
          axios
            .post("/cart/delete", { user: userInfo?._id })
            .then((res) => {
              alert("구매해주셔서 감사합니다.");
              navigate("/");
              window.location.reload();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      alert(`결제실패 : ${error_msg}`);
    }
  };

  return (
    <div className="pay">
      <SubMenu />
      <div className="pay-inner">
        <div className="back">
          <LuArrowLeft onClick={() => navigate(-1)} />
        </div>
        <p className="delivery-title">물품을 배송 받을 장소</p>
        <div className="delivery-info">
          <span>이름: {userInfo?.name}</span>
          <span>연락처: {userInfo?.phone}</span>
          <span>배송요청</span>
          <textarea
            typeof="text"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="delivery-address">
          <span>{payAddress.address}</span>
          <span>{payAddress.addressDetail}</span>
          <Button variant="primary" onClick={handleShow}>
            편집
          </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>배송장소 변경</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <PayDelivery handleClose={handleClose} />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="item-list">
          <p>품목</p>
          <ul>
            {itemLength > 0 ? (
              <>
                {itemList?.map((it, i) => {
                  return (
                    <li key={i}>
                      <img src={it.image} />
                    </li>
                  );
                })}
              </>
            ) : (
              <div
                className="alert"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                상품이 존재하지 않습니다.
              </div>
            )}
          </ul>
          <div className="total-price">
            <span>
              총합:{" "}
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </span>
          </div>
        </div>
      </div>
      <div className="payment">
        <span>배송</span>
        <span>무료</span>
        <button type="button" onClick={handlePayment}>
          결제하기
        </button>
      </div>
      <Footer classPadding="" />
    </div>
  );
}

export default Pay;
