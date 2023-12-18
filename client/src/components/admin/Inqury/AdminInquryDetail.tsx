import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  handlerAdminMenu,
  handlerAdminPagesChange,
} from "../../../Store";
import { LuArrowRight } from "react-icons/lu";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function AdminInquryDetail() {
  const [show, setShow] = useState<boolean>(false);
  const [inquryAnswer, setInquryAnswer] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let dispatch = useDispatch();
  const adminNav = useSelector((state: RootState) => state.adminNav);
  const adminInquryDetail = useSelector(
    (state: RootState) => state.adminInquryDetail
  );

  useEffect(() => {
    setInquryAnswer(adminInquryDetail.answer);
  }, []);

  const hanlderInquryAnswer = () => {
    if (inquryAnswer === "") {
      alert("답변을 적어주세요.");
    } else {
      axios
        .post("http://localhost:8080/admin/inqury/answer", {
          _id: adminInquryDetail._id,
          answer: inquryAnswer,
        })
        .then((res) => {
          alert(res.data);
          dispatch(
            handlerAdminPagesChange({
              pages: "userInqury",
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={
        adminNav.show ? "admin-inqury-detail" : "admin-inqury-detail active"
      }
    >
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
      <h6>문의 상세</h6>

      <div className="back">
        <span
          onClick={() => {
            dispatch(
              handlerAdminPagesChange({
                pages: "userInqury",
              })
            );
          }}
        >
          뒤로가기
        </span>
      </div>

      <div className="inqury-detail">
        <div className="title">
          <p>제목</p>
          <span>{adminInquryDetail.title}</span>
        </div>
        <div className="date">
          <p style={{ color: "black" }}>{adminInquryDetail.date}</p>
        </div>
        <div className="detail">
          <p>문의내용</p>
          <textarea
            typeof="text"
            disabled={true}
            defaultValue={adminInquryDetail.detail}
          ></textarea>
        </div>
        <div className="image">
          <p>이미지 첨부</p>
          <ul>
            {adminInquryDetail.imageSrc.map((image, idx) => {
              return (
                <li key={idx}>
                  <img src={image} onClick={handleShow} />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <img src={image} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="answer">
          <p>답변</p>
          <textarea
            typeof="text"
            value={inquryAnswer}
            onChange={(e) => {
              setInquryAnswer(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="submit-btn">
          <span onClick={hanlderInquryAnswer}>
            {adminInquryDetail.answer === "" ? "답변하기" : "수정하기"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminInquryDetail;
