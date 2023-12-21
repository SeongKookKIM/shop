import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { LuShoppingBag, LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
  RootState,
  handlerAdminMenu,
  handlerAdminPagesChange,
} from "../../Store";
import { useDispatch, useSelector } from "react-redux";

function AdminNav() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const adminNav = useSelector((state: RootState) => state.adminNav);

  return (
    <div className={adminNav.show ? "admin-nav" : "admin-nav hide"}>
      <div className="nav-hide">
        <LuArrowLeft
          onClick={() => {
            dispatch(handlerAdminMenu(false));
          }}
        />
      </div>

      <h6
        onClick={() => {
          dispatch(
            handlerAdminPagesChange({
              pages: "",
            })
          );
        }}
      >
        관리자 페이지
        <span>
          * 관리자페이지는 데스크탑(1024px이상)에 최적화 되어있습니다.
        </span>
        <span>* 상품등록은 pc에서만 진행해주세요.</span>
      </h6>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>회원정보</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "user",
                      })
                    );
                  }}
                >
                  회원관리
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>상품정보</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "productAdd",
                      })
                    );
                  }}
                >
                  상품등록
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "productEdit",
                      })
                    );
                  }}
                >
                  상품수정 및 삭제
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>주문정보</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "productOrder",
                      })
                    );
                  }}
                >
                  배송정보
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "productReturn",
                      })
                    );
                  }}
                >
                  반품정보
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>고객문의</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      handlerAdminPagesChange({
                        pages: "userInqury",
                      })
                    );
                  }}
                >
                  고객문의
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="shop-return">
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          <LuShoppingBag />몰 바로가기
        </p>
      </div>
    </div>
  );
}

export default AdminNav;
